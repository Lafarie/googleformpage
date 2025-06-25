'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import countryData from '@/data/country.json'

interface CountryConfig {
  code: string
  removePrefix: string
  minLength: number
  maxLength: number
  flag: string
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  contact: string
  country: string
  gender: string
  stream: string
}

interface ValidationErrors {
  [key: string]: string
}

export default function AlumniForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    country: '',
    gender: '',
    stream: ''
  })

  const [showTicketSection, setShowTicketSection] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [filteredCountries, setFilteredCountries] = useState<string[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitButtonText, setSubmitButtonText] = useState('Register for Alumni Reunion')
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)

  const countryInputRef = useRef<HTMLInputElement>(null)
  const contactInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const countries = Object.keys(countryData)

  useEffect(() => {
    setFilteredCountries(countries)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        countryInputRef.current &&
        dropdownRef.current &&
        !countryInputRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleCountryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData(prev => ({ ...prev, country: value }))
    
    const filtered = countries.filter(country =>
      country.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredCountries(filtered)
    setHighlightedIndex(-1)
    setShowDropdown(true)
    
    if (validationErrors.country) {
      setValidationErrors(prev => ({ ...prev, country: '' }))
    }
  }

  const handleCountryInputFocus = () => {
    setShowDropdown(true)
    setFilteredCountries(countries)
  }

  const handleCountryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex(prev => Math.min(prev + 1, filteredCountries.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(prev => Math.max(prev - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (highlightedIndex >= 0) {
        selectCountry(filteredCountries[highlightedIndex])
      }
    } else if (e.key === 'Escape') {
      setShowDropdown(false)
      setHighlightedIndex(-1)
    }
  }

  const selectCountry = (country: string) => {
    setFormData(prev => ({ ...prev, country }))
    setShowDropdown(false)
    setHighlightedIndex(-1)
  }

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d+]/g, '')
    
    if (!value.startsWith('+')) {
      value = value.replace(/\+/g, '')
    }
    
    setFormData(prev => ({ ...prev, contact: value }))
    
    if (validationErrors.contact) {
      setValidationErrors(prev => ({ ...prev, contact: '' }))
    }
  }

  const formatContactNumber = (countryName: string, contactValue: string, showVisualFeedback = false): boolean => {
    if (!contactValue) return false
    
    const countryConfig = countryData[countryName as keyof typeof countryData] as CountryConfig
    
    if (countryConfig) {
      let cleanedContact = contactValue.replace(/^\+\d{1,4}/, '')
      
      if (countryConfig.removePrefix && cleanedContact.startsWith(countryConfig.removePrefix)) {
        cleanedContact = cleanedContact.substring(countryConfig.removePrefix.length)
      }
      
      cleanedContact = cleanedContact.replace(/\D/g, '')
      
      if (cleanedContact.length >= countryConfig.minLength && cleanedContact.length <= countryConfig.maxLength) {
        const formattedNumber = countryConfig.code + cleanedContact
        setFormData(prev => ({ ...prev, contact: formattedNumber }))
        
        if (showVisualFeedback && contactInputRef.current) {
          contactInputRef.current.classList.add('formatting')
          setTimeout(() => {
            contactInputRef.current?.classList.remove('formatting')
          }, 1500)
        }
        
        return true
      }
    }
    
    return false
  }

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {}
    
    if (!formData.firstName.trim() || formData.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters'
    }
    
    if (!formData.lastName.trim() || formData.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters'
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address'
    }
    
    const contactRegex = /^[\d+\-\s()]+$/
    if (!formData.contact.trim() || !contactRegex.test(formData.contact.trim()) || formData.contact.trim().length < 8) {
      errors.contact = 'Please enter a valid contact number (at least 8 digits)'
    }
    
    if (!formData.country.trim()) {
      errors.country = 'Please select your country'
    }
    
    if (!formData.gender) {
      errors.gender = 'Please select your gender'
    }
    
    if (!formData.stream) {
      errors.stream = 'Please select your stream'
    }
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const generateTicketUrl = (userData: FormData): string => {
    const dataToEncode = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      contact: userData.contact,
      country: userData.country,
      gender: userData.gender,
      stream: userData.stream,
      timestamp: new Date().toISOString(),
    }
    
    const jsonString = JSON.stringify(dataToEncode)
    const encoded = btoa(jsonString)
    const baseUrl = "https://stgappigo-mall.hsenidmobile.com/UOCALUMNI/products/alumni-tickets"
    return `${baseUrl}?data=${encodeURIComponent(encoded)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      if (formData.country && formData.contact) {
        setSubmitButtonText('📱 Formatting Contact Number...')
        const formatSuccess = formatContactNumber(formData.country, formData.contact, true)
        
        if (!formatSuccess) {
          setSubmitButtonText('❌ Invalid Contact Number')
          setTimeout(() => {
            setSubmitButtonText('Register for Alumni Reunion')
            setIsSubmitting(false)
            contactInputRef.current?.focus()
          }, 2000)
          return
        }
        
        await new Promise(resolve => setTimeout(resolve, 1800))
      }
      
      setSubmitButtonText('🚀 Submitting Registration...')
      setSubmittedData(formData)
      
      const formDataToSubmit = new FormData()
      formDataToSubmit.append('entry.344858218', formData.firstName)
      formDataToSubmit.append('entry.491468228', formData.lastName)
      formDataToSubmit.append('entry.1816651679', formData.gender)
      formDataToSubmit.append('entry.853228319', formData.email)
      formDataToSubmit.append('entry.36020433', formData.contact)
      formDataToSubmit.append('entry.962797291', formData.country)
      formDataToSubmit.append('entry.1045473638', formData.stream)
      formDataToSubmit.append('fvv', '1')
      formDataToSubmit.append('fbzx', '6853233660929213177')
      formDataToSubmit.append('pageHistory', '0')
      
      try {
        await fetch(
          'https://docs.google.com/forms/d/e/1FAIpQLSdkXqhlRr7QlOUxROzVLp3k3mSlhjCwX-KfWmb1q9W8cywVvw/formResponse',
          {
            method: 'POST',
            body: formDataToSubmit,
            mode: 'no-cors'
          }
        )
      } catch (error) {
        console.log('Form submitted (CORS expected)')
      }
      
      setSubmitButtonText('✅ Registration Completed!')
      
      setTimeout(() => {
        setShowTicketSection(true)
      }, 1000)
      
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitButtonText('❌ Submission Failed')
      setTimeout(() => {
        setSubmitButtonText('Register for Alumni Reunion')
        setIsSubmitting(false)
      }, 2000)
    }
  }

  const handleBackToForm = () => {
    setShowTicketSection(false)
    setSubmitButtonText('Register for Alumni Reunion')
    setIsSubmitting(false)
  }

  const ticketUrl = submittedData ? generateTicketUrl(submittedData) : generateTicketUrl(formData)

  if (showTicketSection) {
    return (
      <div className="container-alumni">
        <div className="ticket-section show">
          <h1 className="ticket-title">🎉 Registration Complete!</h1>
          <p className="ticket-description">
            Thank you for registering for our 25th Anniversary Reunion! Complete your purchase to secure your spot at this memorable celebration.
          </p>

          <a href={ticketUrl} className="buy-btn" target="_blank" rel="noopener noreferrer">
            <span className="buy-btn-icon">🎫</span>
            Purchase Your Tickets Now
          </a>
          <br />
          <button className="back-link" onClick={handleBackToForm}>
            ← Back to Registration Form
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container-alumni">
      <div className="form-container">
        <Image src="/banner2.jpg" alt="Alumni Reunion Banner" width={800} height={300} priority />
        
        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5 text-alumni-light">
          <fieldset className="text-center mb-8 border-none">
            <h2 className="form-title">Alumni Registration</h2>
            <p className="form-subtitle">Join us for our 25th Anniversary Reunion celebration</p>
          </fieldset>

          <fieldset className="border-none mb-6">
            <label className="form-label" htmlFor="firstName">First Name*</label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              className="form-input"
              required
            />
            {validationErrors.firstName && (
              <div className="validation-message">{validationErrors.firstName}</div>
            )}
          </fieldset>

          <fieldset className="border-none mb-6">
            <label className="form-label" htmlFor="lastName">Last Name*</label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              className="form-input"
              required
            />
            {validationErrors.lastName && (
              <div className="validation-message">{validationErrors.lastName}</div>
            )}
          </fieldset>

          <fieldset className="border-none mb-6">
            <label className="form-label">Gender*</label>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  id="gender-male"
                  checked={formData.gender === 'Male'}
                  onChange={handleRadioChange}
                />
                <label htmlFor="gender-male">Male</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  id="gender-female"
                  checked={formData.gender === 'Female'}
                  onChange={handleRadioChange}
                />
                <label htmlFor="gender-female">Female</label>
              </div>
            </div>
            {validationErrors.gender && (
              <div className="validation-message">{validationErrors.gender}</div>
            )}
          </fieldset>

          <fieldset className="border-none mb-6">
            <label className="form-label" htmlFor="email">Email Address*</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className="form-input"
              required
            />
            {validationErrors.email && (
              <div className="validation-message">{validationErrors.email}</div>
            )}
          </fieldset>

          <fieldset className="border-none mb-6">
            <label className="form-label" htmlFor="contact">Contact Number*</label>
            <input
              ref={contactInputRef}
              id="contact"
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleContactInputChange}
              placeholder="Enter your contact number (will be formatted with country code)"
              className="form-input"
              required
            />
            <small className="form-hint">Number will be automatically formatted with your country code when you submit</small>
            {validationErrors.contact && (
              <div className="validation-message">{validationErrors.contact}</div>
            )}
          </fieldset>

          <fieldset className="border-none mb-6">
            <label className="form-label" htmlFor="country">Country*</label>
            <div className="country-dropdown-container">
              <input
                ref={countryInputRef}
                id="country"
                type="text"
                name="country"
                className="form-input w-full"
                value={formData.country}
                onChange={handleCountryInputChange}
                onFocus={handleCountryInputFocus}
                onKeyDown={handleCountryKeyDown}
                placeholder="Enter your country"
                autoComplete="off"
                required
              />
              <div
                ref={dropdownRef}
                className={`country-dropdown ${showDropdown ? 'show' : ''}`}
              >
                {filteredCountries.map((country, index) => {
                  const config = countryData[country as keyof typeof countryData] as CountryConfig
                  return (
                    <div
                      key={country}
                      className={`country-option ${index === highlightedIndex ? 'highlighted' : ''}`}
                      onClick={() => selectCountry(country)}
                    >
                      {config.flag} {country}
                    </div>
                  )
                })}
              </div>
            </div>
            {validationErrors.country && (
              <div className="validation-message">{validationErrors.country}</div>
            )}
          </fieldset>

          <fieldset className="border-none mb-6">
            <label className="form-label">Academic Stream*</label>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  name="stream"
                  value="Physical Science"
                  id="stream-physical"
                  checked={formData.stream === 'Physical Science'}
                  onChange={handleRadioChange}
                />
                <label htmlFor="stream-physical">Physical Science</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  name="stream"
                  value="Bio Science"
                  id="stream-bio"
                  checked={formData.stream === 'Bio Science'}
                  onChange={handleRadioChange}
                />
                <label htmlFor="stream-bio">Bio Science</label>
              </div>
            </div>
            {validationErrors.stream && (
              <div className="validation-message">{validationErrors.stream}</div>
            )}
          </fieldset>

          <button
            className="submit-btn"
            type="submit"
            disabled={isSubmitting}
          >
            {submitButtonText}
          </button>
        </form>

        <div className="buy-section">
          <p className="buy-section-title">Ready to Join the Celebration?</p>
          <a href={ticketUrl} className="buy-btn" target="_blank" rel="noopener noreferrer">
            <span className="buy-btn-icon">🎫</span>
            Purchase Tickets Now
          </a>
        </div>
      </div>
    </div>
  )
} 
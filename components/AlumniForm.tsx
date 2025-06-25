'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import countryData from '@/data/country.json'
import { tree } from 'next/dist/build/templates/app-page'

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
  const [showCountryCodeDropdown, setShowCountryCodeDropdown] = useState(false)
  const [filteredCountries, setFilteredCountries] = useState<string[]>([])
  const [filteredCountryCodeList, setFilteredCountryCodeList] = useState<string[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [highlightedCountryCodeIndex, setHighlightedCountryCodeIndex] = useState(-1)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitButtonText, setSubmitButtonText] = useState('Register')
  const [submittedData, setSubmittedData] = useState<FormData | null>(null)
  const [contact, setContact] = useState('')
  const [selectedCountryCode, setSelectedCountryCode] = useState<{code: string, flag: string, country: string}>({
    code: '+94',
    flag: '🇱🇰',
    country: 'Sri Lanka'
  })
  const [allowCountrySync, setAllowCountrySync] = useState(true)

  const countryInputRef = useRef<HTMLInputElement>(null)
  const contactInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const countryCodeDropdownRef = useRef<HTMLDivElement>(null)
  const countryCodeButtonRef = useRef<HTMLButtonElement>(null)

  const countries = Object.keys(countryData)

  useEffect(() => {
    setFilteredCountries(countries)
    setFilteredCountryCodeList(countries)
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

      if (
        countryCodeButtonRef.current &&
        countryCodeDropdownRef.current &&
        !countryCodeButtonRef.current.contains(event.target as Node) &&
        !countryCodeDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryCodeDropdown(false)
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
    
    // Re-enable sync when user types in country field
    setAllowCountrySync(false)
    
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
    
    // Auto-update the contact country code to match the selected country
    const config = countryData[country as keyof typeof countryData] as CountryConfig
    if (config) {
      setSelectedCountryCode({
        code: config.code,
        flag: config.flag,
        country: country
      })
      
      // Re-format the existing contact number with the new country code
      if (contact) {
        const fullNumber = config.code + contact
        setFormData(prev => ({ ...prev, contact: fullNumber }))
      }
      
      // Re-enable sync since user selected from country field
      setAllowCountrySync(false)
    }
  }

  const handleCountryCodeSearch = (searchTerm: string) => {
    const filtered = countries.filter(country =>
      country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (countryData[country as keyof typeof countryData] as CountryConfig).code.includes(searchTerm)
    )
    setFilteredCountryCodeList(filtered)
    setHighlightedCountryCodeIndex(-1)
  }

  const selectCountryCode = (country: string) => {
    const config = countryData[country as keyof typeof countryData] as CountryConfig
    setSelectedCountryCode({
      code: config.code,
      flag: config.flag,
      country: country
    })
    setAllowCountrySync(false)
    setShowCountryCodeDropdown(false)
    setHighlightedCountryCodeIndex(-1)
    
    // Only auto-update the country field on initial selections or when sync is allowed
    if (allowCountrySync) {
      setFormData(prev => ({ ...prev, country }))
      // After first manual country code change, disable auto-sync from contact to country
      setAllowCountrySync(false)
    }
    
    // Re-format the existing contact number with the new country code
    // if (contact) {
    //   const fullNumber = config.code + contact
    //   setFormData(prev => ({ ...prev, contact: fullNumber }))
    // }
  }

  const handleContactInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, '')
    
    // Get the selected country's configuration
    const countryConfig = countryData[selectedCountryCode.country as keyof typeof countryData] as CountryConfig
    

    // Remove real time the prefix if it exists and the country has a removePrefix setting
    
    
    setContact(value)

    if (countryConfig && countryConfig.removePrefix && value.startsWith(countryConfig.removePrefix)) {
      value = value.substring(countryConfig.removePrefix.length)
    }

    // Update the form data with the full number including country code
    const fullNumber = selectedCountryCode.code + value
    setFormData(prev => ({ ...prev, contact: fullNumber }))
    
    if (validationErrors.contact) {
      setValidationErrors(prev => ({ ...prev, contact: '' }))
    }
  }

  const formatContactNumber = (countryName: string, contactValue: string, showVisualFeedback = false): Boolean => {
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
        setContact(formattedNumber)
        console.log(formattedNumber)
        if (showVisualFeedback && contactInputRef.current) {
          contactInputRef.current.classList.add('animate-pulse')
          setTimeout(() => {
            contactInputRef.current?.classList.remove('animate-pulse')
          }, 1500)
        }
        
        return true;
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
    
    if (!contact.trim() || contact.trim().length < 8) {
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
      code: selectedCountryCode.code
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
      setSubmitButtonText('Submitting Registration...')
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
      
      setSubmitButtonText('Registration Completed!')
      
      setTimeout(() => {
        setShowTicketSection(true)
      }, 1000)
      
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitButtonText('Submission Failed')
      setTimeout(() => {
        setSubmitButtonText('Register')
        setIsSubmitting(false)
      }, 2000)
    }
  }

  const handleBackToForm = () => {
    setShowTicketSection(false)
    setSubmitButtonText('Register')
    setIsSubmitting(false)
  }

  // Generate ticket URL - use a fallback URL to prevent hydration issues
  const getTicketUrl = () => {
    try {
      const dataForUrl = submittedData || formData
      if (dataForUrl.firstName || dataForUrl.lastName || dataForUrl.email) {
        return generateTicketUrl(dataForUrl)
      }
    } catch (error) {
      console.error('Error generating ticket URL:', error)
    }
    return "https://stgappigo-mall.hsenidmobile.com/UOCALUMNI/products/alumni-tickets"
  }

  if (showTicketSection) {
    return (
      <div className="max-w-2xl mx-auto p-3 sm:p-5 relative z-10">
        <div className="text-center bg-black/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
            Registration Complete!
          </h1>
          <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 leading-relaxed px-2">
            Thank you for registering for our 25th Anniversary Reunion! Complete your purchase to secure your spot at this memorable celebration.
          </p>

          <a 
            href={getTicketUrl()} 
            className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gray-600/80 text-white no-underline rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gray-600 hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Purchase Your Tickets Now
          </a>
          <br />
          <button 
            className="inline-block mt-4 sm:mt-5 text-gray-400 text-sm transition-colors duration-300 cursor-pointer hover:text-yellow-400 bg-transparent border-none"
            onClick={handleBackToForm}
          >
            ← Back to Registration Form
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-3 sm:p-5 relative z-10 ">
      <div className="bg-black/50 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10">
        <Image 
          src="/banner2.jpg" 
          alt="Alumni Reunion Banner" 
          width={800} 
          height={300} 
          priority 
          className="w-full rounded-t-2xl sm:rounded-t-3xl mb-1 shadow-lg"
        />
        
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8 flex flex-col gap-0">
          <div className="text-center mb-6 sm:mb-8 max-w-md mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2 bg-gradient-to-r from-[#B98C53] to-yellow-200 bg-clip-text text-transparent text-[#B98C53]">
              Alumni Registration
            </h2>
            <p className="text-sm text-gray-400 font-normal px-2">
              Join us for our 25th Anniversary Reunion celebration
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="firstName">
              First Name*
            </label>
            <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm transition-all duration-300 backdrop-blur-sm placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(255,215,0,0.1)] focus:bg-white/[0.08]"
              required
            />
            {validationErrors.firstName && (
              <div className="text-red-400 text-xs mt-1 p-2 bg-red-400/10 rounded-md border border-red-400/30">
                {validationErrors.firstName}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="lastName">
              Last Name*
            </label>
            <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm transition-all duration-300 backdrop-blur-sm placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(255,215,0,0.1)] focus:bg-white/[0.08]"
              required
            />
            {validationErrors.lastName && (
              <div className="text-red-400 text-xs mt-1 p-2 bg-red-400/10 rounded-md border border-red-400/30">
                {validationErrors.lastName}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-2">Gender*</label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 my-3">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  id="gender-male"
                  checked={formData.gender === 'Male'}
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
                />
                <label htmlFor="gender-male" className="text-gray-200 cursor-pointer">Male</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  id="gender-female"
                  checked={formData.gender === 'Female'}
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
                />
                <label htmlFor="gender-female" className="text-gray-200 cursor-pointer">Female</label>
              </div>
            </div>
            {validationErrors.gender && (
              <div className="text-red-400 text-xs mt-1 p-2 bg-red-400/10 rounded-md border border-red-400/30">
                {validationErrors.gender}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="email">
              Email Address*
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email address"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm transition-all duration-300 backdrop-blur-sm placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(255,215,0,0.1)] focus:bg-white/[0.08]"
              required
            />
            {validationErrors.email && (
              <div className="text-red-400 text-xs mt-1 p-2 bg-red-400/10 rounded-md border border-red-400/30">
                {validationErrors.email}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="country">
              Where you from? Country*
            </label>
            <div className="relative">
              <input
                ref={countryInputRef}
                id="country"
                type="text"
                name="country"
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm transition-all duration-300 backdrop-blur-sm placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(255,215,0,0.1)] focus:bg-white/[0.08]"
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
                className={`absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg border border-white/10 rounded-xl max-h-52 overflow-y-auto z-50 mt-1 ${showDropdown ? 'block' : 'hidden'}`}
              >
                {filteredCountries.map((country, index) => {
                  const config = countryData[country as keyof typeof countryData] as CountryConfig
                  return (
                    <div
                      key={country}
                      className={`p-3 cursor-pointer transition-colors duration-200 text-sm hover:bg-yellow-400/10 hover:text-yellow-400 ${index === highlightedIndex ? 'bg-yellow-400/10 text-yellow-400' : 'text-white'}`}
                      onClick={() => selectCountry(country)}
                    >
                      {config.flag} {country}
                    </div>
                  )
                })}
              </div>
            </div>
            {validationErrors.country && (
              <div className="text-red-400 text-xs mt-1 p-2 bg-red-400/10 rounded-md border border-red-400/30">
                {validationErrors.country}
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-2" htmlFor="contact">
              Contact Number*
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative w-full sm:w-auto">
                <button
                  ref={countryCodeButtonRef}
                  type="button"
                  onClick={() => setShowCountryCodeDropdown(!showCountryCodeDropdown)}
                  className="flex items-center justify-between w-full sm:w-auto gap-2 p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm transition-all duration-300 backdrop-blur-sm hover:bg-white/10 focus:outline-none focus:border-yellow-400 min-w-[120px]"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-base mb-1">{selectedCountryCode.flag}</span>
                    <span className="font-mono">{selectedCountryCode.code}</span>
                    <span className="sm:hidden text-md text-gray-300 truncate tracking-widest">{selectedCountryCode.country}</span>
                  </div>
                  <span className="text-gray-400">▼</span>
                </button>
                
                <div
                  ref={countryCodeDropdownRef}
                  className={`absolute top-full left-0 right-0 bg-black/90 backdrop-blur-lg border border-white/10 rounded-xl max-h-52 overflow-y-auto z-50 mt-1 ${showCountryCodeDropdown ? 'block' : 'hidden'} w-full sm:min-w-[300px]`}
                >
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search country..."
                      className="w-full p-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-gray-400 focus:outline-none focus:border-yellow-400"
                      onChange={(e) => handleCountryCodeSearch(e.target.value)}
                    />
                  </div>
                  {filteredCountryCodeList.map((country, index) => {
                    const config = countryData[country as keyof typeof countryData] as CountryConfig
                    return (
                      <div
                        key={country}
                        className={`p-3 cursor-pointer transition-colors duration-200 text-sm hover:bg-yellow-400/10 hover:text-yellow-400 flex items-center gap-3 ${index === highlightedCountryCodeIndex ? 'bg-yellow-400/10 text-yellow-400' : 'text-white'}`}
                        onClick={() => selectCountryCode(country)}
                      >
                        <span className="text-base">{config.flag}</span>
                        <span className="font-mono text-gray-300">{config.code}</span>
                        <span className="flex-1 truncate">{country}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <input
                ref={contactInputRef}
                id="contact"
                type="tel"
                name="contact"
                value={contact}
                onChange={handleContactInputChange}
                placeholder="Enter your phone number"
                className="flex-1 p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm transition-all duration-300 backdrop-blur-sm placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 focus:shadow-[0_0_0_3px_rgba(255,215,0,0.1)] focus:bg-white/[0.08] appearance-none"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                required
              />
            </div>
            <small className="block text-xs text-gray-400 mt-1 italic">
              Select your country code and enter your phone number
            </small>
            {validationErrors.contact && (
              <div className="text-red-400 text-xs mt-1 p-2 bg-red-400/10 rounded-md border border-red-400/30">
                {validationErrors.contact}
              </div>
            )}
          </div>

          

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-200 mb-2">Academic Stream*</label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 my-3">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="stream"
                  value="Physical Science"
                  id="stream-physical"
                  checked={formData.stream === 'Physical Science'}
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                />
                <label htmlFor="stream-physical" className="text-gray-200 cursor-pointer">Physical Science</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="stream"
                  value="Bio Science"
                  id="stream-bio"
                  checked={formData.stream === 'Bio Science'}
                  onChange={handleRadioChange}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                />
                <label htmlFor="stream-bio" className="text-gray-200 cursor-pointer">Bio Science</label>
              </div>
            </div>
            {validationErrors.stream && (
              <div className="text-red-400 text-xs mt-1 p-2 bg-red-400/10 rounded-md border border-red-400/30">
                {validationErrors.stream}
              </div>
            )}
          </div>

          <button
            className="w-full p-3 sm:p-4 bg-[#534088] bg-gradient-to-r from-[#34088] to-purple-500 text-white border-none rounded-xl text-sm sm:text-base font-semibold cursor-pointer transition-all duration-300 mt-3 shadow-lg hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            type="submit"
            disabled={isSubmitting}
          >
            {submitButtonText}
          </button>
        </form>

        <hr className="mx-4 sm:mx-5" />

        <div className="mt-4 text-center p-1 rounded-2xl mx-4 sm:mx-8 mb-6 sm:mb-8">
          <p className="text-sm sm:text-base font-medium text-gray-200 mb-4">Ready to Join the Celebration?</p>
          <a 
            href={getTicketUrl()} 
            className="flex items-center font-bold justify-center w-full gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gray-600/80 text-white no-underline rounded-xl text-sm font-medium transition-all duration-300 hover:bg-gray-600 hover:-translate-y-0.5 hover:shadow-lg" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Purchase Tickets Now
          </a>
        </div>
      </div>
    </div>
  )
} 
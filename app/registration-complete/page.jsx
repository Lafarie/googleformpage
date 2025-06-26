'use client'

import { useSearchParams, useRouter } from 'next/navigation'

export default function RegistrationComplete() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const data = searchParams.get('data')

  const handleBackToForm = () => {
    router.back()
  }

  return (
    <main className="max-w-4xl mx-auto p-3 sm:p-5 z-10 min-h-screen flex items-center justify-center">
        <section className="text-center bg-black/70 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-2xl border border-white/10" role="main" aria-label="Registration Confirmation">
          <header>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#B98C53] to-yellow-200 bg-clip-text text-transparent">
              Registration Complete!
            </h1>
            <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 leading-relaxed px-2">
              Thank you for registering for our 25th Anniversary Reunion! Complete your purchase to secure your spot at this memorable celebration.
            </p>
          </header>

          <a 
            href={data} 
            className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-[#534088] text-white no-underline rounded-xl text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg w-full sm:w-auto" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Purchase tickets for University of Colombo Alumni 25th Anniversary Reunion (opens in new tab)"
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
        </section>
      </main>
  );
}

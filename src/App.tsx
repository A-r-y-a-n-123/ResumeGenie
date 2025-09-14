import Admin from './pages/Admin'
import Recruiter from './pages/Recruiter'
import JobSeeker from './pages/JobSeeker'

import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'


const App = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen)
    }
  
    const closeMobileMenu = () => {
      setIsMobileMenuOpen(false)
    }
  
    return (
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-lg sm:text-xl font-semibold text-gray-900">ResumeGenie</h1>
                </div>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                  <Link 
                    to="/jobseeker" 
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Job Seeker
                  </Link>
                  <Link 
                    to="/recruiter" 
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Recruiter
                  </Link>
                  <Link 
                    to="/admin" 
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Admin
                  </Link>
                </div>
  
                {/* Mobile menu button */}
                <div className="md:hidden flex items-center">
                  <button
                    onClick={toggleMobileMenu}
                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    {/* Hamburger icon */}
                    <svg
                      className={`${isMobileMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    {/* Close icon */}
                    <svg
                      className={`${isMobileMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
  
              {/* Mobile Navigation Menu */}
              <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
                  <Link 
                    to="/jobseeker" 
                    onClick={closeMobileMenu}
                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  >
                    Job Seeker
                  </Link>

                  <Link 
                    to="/recruiter" 
                    onClick={closeMobileMenu}
                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  >
                    Recruiter
                  </Link>

                  <Link 
                    to="/admin" 
                    onClick={closeMobileMenu}
                    className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                  >
                    Admin
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <Routes>
              <Route path="/" element={<JobSeeker />}/>
              <Route path="/jobseeker" element={<JobSeeker />} />
              <Route path="/recruiter" element={<Recruiter />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    )
  }
export default App;
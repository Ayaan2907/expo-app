import { useState } from 'react'
import { useAuthStore } from './auth-store'
import { authApi, RegisterUserData, LoginResponse } from './auth-api'

// Custom useSignIn hook
export function useSignIn() {
  const [isLoaded, setIsLoaded] = useState(true)
  const { setUser, setSession } = useAuthStore()

      const signIn = {
      create: async ({ identifier, password }: { identifier: string; password: string }) => {
        try {

          const response = await authApi.login(identifier, password)
          
          // Handle response - it's an array with user object
          if (response.data && response.data.length > 0) {
            const userData = response.data[0]
            
            // Map API response to our user object
            const user = {
              usrId: userData.usrId,
              usrEmail: userData.usrEmail,
              usrName: userData.usrName,
              usrType: userData.usrType,
              usrCont: userData.usrCont
            }
            
            const sessionId = `session_${Date.now()}` // TODO: Generate a unique session ID
            setUser(user)
            setSession({ id: sessionId })
            
            return {
              status: 'complete',
              createdSessionId: sessionId
            }
          } else {
            throw new Error('Invalid login response')
          }
        } catch (error) {
          console.error('Sign-in failed:', error)
          throw new Error('Sign-in failed')
        }
      }
    }

  const setActive = async ({ session }: { session: string }) => {
    setSession({ id: session })
    return true
  }

  return {
    signIn,
    setActive,
    isLoaded
  }
}


export function useSignUp() {
  const [isLoaded, setIsLoaded] = useState(true)
  const [tempUserData, setTempUserData] = useState<any>(null)
  const { setUser, setSession } = useAuthStore()

  const signUp = {
    create: async ({ 
      name, 
      mobile, 
      emailAddress, 
      password, 
      userType 
    }: { 
      name: string
      mobile: string
      emailAddress: string
      password: string
      userType: string 
    }) => {
      try {
        // Send OTP to email
        await authApi.sendOTP(emailAddress)
        
        // Store temporary data for later registration
        setTempUserData({ name, mobile, emailAddress, password, userType })
        
        return {
          status: 'needs_verification',
          emailAddress
        }
      } catch (error) {
        console.error('Sign-up failed:', error)
        throw new Error('Sign-up failed')
      }
    },

    prepareEmailAddressVerification: async ({ strategy }: { strategy: string }) => {
      // OTP already sent in create step
      return true
    },

    attemptEmailAddressVerification: async ({ code }: { code: string }) => {
      try {
        if (!tempUserData) {
          throw new Error('No signup data found')
        }

        // Validate OTP
        await authApi.validateOTP(tempUserData.emailAddress, code)
        
        // Create user registration data
        const registrationData: RegisterUserData = {
          usrId: tempUserData.emailAddress,
          usrType: tempUserData.userType,
          passWord: tempUserData.password,
          usrName: tempUserData.name,
          usrCont: tempUserData.mobile,
          usrEmail: tempUserData.emailAddress,
          regisDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
          street: '', // Optional field
          city: '',   // Optional field
          state: '',  // Optional field
          zip: '',    // Optional field
          otp: code
        }

        // Register the user
        const response = await authApi.registerUser(registrationData)
        
        // Create user object for store
        const user = {
          usrId: registrationData.usrId,
          usrEmail: registrationData.usrEmail,
          usrName: registrationData.usrName,
          usrType: registrationData.usrType,
          usrCont: registrationData.usrCont
        }
        
        const sessionId = `session_${Date.now()}`
        setUser(user)
        setSession({ id: sessionId })
        
        return {
          status: 'complete',
          createdSessionId: sessionId
        }
      } catch (error) {
        console.error('Verification failed:', error)
        throw new Error('Verification failed')
      }
    }
  }

  const setActive = async ({ session }: { session: string }) => {
    setSession({ id: session })
    return true
  }

  return {
    isLoaded,
    signUp,
    setActive
  }
}

// Custom useAuth hook using Zustand store
export function useAuth() {
  const { isSignedIn, user, session, isLoaded } = useAuthStore()
  
  return {
    isSignedIn,
    user,
    session,
    isLoaded
  }
} 
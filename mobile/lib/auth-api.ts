import { api } from './useApiCalls'


export interface RegisterUserData {
  usrId: string
  usrType: 'A' | 'P' | 'S' // Admin, Primary, or Secondary
  passWord: string
  usrName: string
  usrCont: string // phone number
  usrEmail: string
  regisDate: string
  street: string
  city: string
  state: string
  zip: string
  otp: string
}

export interface ValidateEmailData {
  usrId: string
  usrEmail: string
  emailSubject: string
  emailContent: string
}

export interface LoginResponse {
  usrId: string
  passWord: string
  usrType: 'A' | 'P' | 'S'
  usrName: string
  usrCont: string
  usrEmail: string
  regisDate: string | null
  street: string
  city: string
  state: string
  zip: string
  otp: string | null
  usrValid: boolean
}

// Auth API functions matching your endpoints
export const authApi = {
  // Check if server is reachable
//   ping: async () => {
//     return await api.get('/user/ping')
//   },

  // User login
  login: async (usrId: string, pWord: string) => {
    return await api.post<LoginResponse[]>('/user/login', {}, {
      usrId,
      pWord
    })
  },

  // Send OTP (assumed endpoint)
  sendOTP: async (email: string) => {
    return await api.post('/user/sendOtp', { email })
  },

  // Validate OTP
  validateOTP: async (id: string, otp: string) => {
    return await api.get('/user/validateOTP', { id, otp })
  },

  // Register new user
  registerUser: async (userData: RegisterUserData) => {
    return await api.post('/user/registerUser', userData)
  },

  // Validate email with file upload
  validateEmail: async (userInfo: ValidateEmailData, file?: any) => {
    const formData = new FormData()
    formData.append('userInfo', JSON.stringify(userInfo))
    if (file) {
      formData.append('files', file)
    }
    
    return await api.post('/utility/validateEmail', formData, {
      'Content-Type': 'multipart/form-data'
    })
  }
} 
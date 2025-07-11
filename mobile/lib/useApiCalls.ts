import { useState } from 'react'
import axios from 'axios'

// Types
interface ApiCallOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  params?: any
  headers?: Record<string, string>
}

interface ApiResponse<T> {
  data: T
  status: number
  success: boolean
}

interface ApiError {
  message: string
  status?: number
  data?: any
}

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://gtronixsystems.com/goldtronix-utility',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function apiCall<T = any>(options: ApiCallOptions): Promise<ApiResponse<T>> {
  try {
    const response = await apiClient({
      url: options.url,
      method: options.method || 'GET',
      data: options.data,
      params: options.params,
      headers: options.headers
    })

    return {
      data: response.data,
      status: response.status,
      success: true
    }
  } catch (error: any) {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'Something went wrong',
      status: error.response?.status,
      data: error.response?.data
    }
    throw apiError
  }
}

export const api = {
  get: <T>(url: string, params?: any, headers?: Record<string, string>) =>
    apiCall<T>({ url, method: 'GET', params, headers }),

  post: <T>(url: string, data?: any, headers?: Record<string, string>) =>
    apiCall<T>({ url, method: 'POST', data, headers }),

  put: <T>(url: string, data?: any, headers?: Record<string, string>) =>
    apiCall<T>({ url, method: 'PUT', data, headers }),

  delete: <T>(url: string, headers?: Record<string, string>) =>
    apiCall<T>({ url, method: 'DELETE', headers })
}


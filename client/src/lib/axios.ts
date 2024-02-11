import axios from "axios"

export const sokerUrl = process.env.NEXT_PUBLIC_API_URL_SOKET ?? 'https://chat-back-yvv3.onrender.com/api/'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'https://chat-back-yvv3.onrender.com/api/',

  withCredentials: true,
})

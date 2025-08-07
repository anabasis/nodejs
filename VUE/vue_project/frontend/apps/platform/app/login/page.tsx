'use client'
import { useEffect } from 'react'

const Login = () => {
  useEffect(() => {
    window.authKc.doLogin('/')
  }, [])
  return <></>
}

export default Login

"use client"

import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { jwtDecode, JwtPayload } from "jwt-decode"

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/lib/constants"
import api from "@/lib/api"

type ProtectedRouteProps = {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter()

  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)

    try {
      const res = await api.post("/api/token/refresh", {
        refresh: refreshToken
      })

      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        setIsAuthorized(true)
      } else {
        setIsAuthorized(false)
      }
    } catch (error) {
      console.log(error)
      setIsAuthorized(false)
    }
  }

  useEffect(() => {
    const auth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN)
      if (!token) {
        setIsAuthorized(false)
        return
      }
      const decoded = jwtDecode<JwtPayload>(token)

      if (!decoded.exp) {
        console.error("Token does not have an expiration field")
        setIsAuthorized(false)
        return
      }

      const now = Date.now() / 1000

      if (decoded.exp < now) {
        await refreshToken()
      } else {
        setIsAuthorized(true)
      }
    }

    auth().catch(() => setIsAuthorized(false))
  }, [])

  useEffect(() => {
    if (isAuthorized === false) {
      router.replace("/login")
    }
  }, [isAuthorized])

  if (isAuthorized === null) {
    return <div>...loading</div>
  }

  return isAuthorized ? children : null
}

"use client"
import { useRouter } from "next/navigation"

import api from "@/lib/api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/lib/constants"
import React, { FormEvent, useState } from "react"

export default function Login() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await api.post("/api/token/", { username, password })
    console.log(res)
    localStorage.setItem(ACCESS_TOKEN, res.data.access)
    localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
    router.replace("/dashboard")
  }

  return (
    <form className="text-3xl flex flex-col gap-4" onSubmit={handleSubmit}>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={loading}>submit {loading && "..."}</button>
    </form>
  )
}

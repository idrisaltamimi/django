"use client"
import React, { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

import api from "@/lib/api"

export default function Register() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    localStorage.clear()
    setLoading(true)
    try {
      await api.post("/api/user/register/", { username, password })
      router.replace("/login")
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
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
        type="text"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={loading}>submit {loading && "..."}</button>
    </form>
  )
}

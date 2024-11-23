import ProtectedRoute from "@/components/ProtectedRoute"
import Link from "next/link"
import { ReactNode } from "react"

type layoutProps = {
  children: ReactNode
}

export default function DashboardLayout({ children }: layoutProps) {
  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-4">
        <Link href="/dashboard/profile">nav profile</Link>
        <Link href="/dashboard/links">nav links</Link>
        {children}
      </div>
    </ProtectedRoute>
  )
}

'use client'

import { useMyAccountQuery } from '@/services/auth/userApi'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const roleRoutes = {
  admin: '/admin/students',
  teacher: '/teacher/themes',
  student: '/student/themes',
}

interface Props {
  children: React.ReactNode
  allowedRoles?: ('admin' | 'teacher' | 'student')[]
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { data: user, isLoading, isError } = useMyAccountQuery()
  const router = useRouter()
  const pathname = usePathname()
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      if (pathname === '/login') {
        if (user && !isError) {
          
          router.replace(roleRoutes[user.role])
        } else {
        
          setChecked(true)
        }
      } else {
        if (isError || !user) {
      
          router.replace('/login')
        } else if (allowedRoles && !allowedRoles.includes(user.role)) {
          
          router.replace(roleRoutes[user.role])
        } else {
      
          setChecked(true)
        }
      }
    }
  }, [isLoading, isError, user, allowedRoles, pathname, router])

  if (!checked) return null

  return <>{children}</>
}

"use client"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { useParams } from 'next/navigation'
import Cookies from "js-cookie";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState('')
  const [error, setError] = useState('')

  function update(e) {
    e.preventDefault()
    axios.put(`https://stream-back-kc0f.onrender.com/admin/update/${params.id}`, {
      username: username,
      email: email,
      isAdmin: isAdmin,
    }, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    }, {
    }).then((res) => {
      router.push('/dashboard/user')
    }).catch(error => {
      console.log(error)
      if (error.status == 404 || error.status === 401) {
        setError(error.response.data.message)
      }
    })
  }

  useEffect(() => {
      axios.get(`https://stream-back-kc0f.onrender.com/admin/user/${params.id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      }, {
      }).then((res) => {
        setUsername(res.data.message.username)
        setEmail(res.data.message.email)
        setIsAdmin(res.data.message.isAdmin)
      }).catch(error => {
        if (error.status == 404 || error.status === 401) {
          setError(error.response.data.message)
        }
      })
  }, [])
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />

          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {
            error ? (
              <div className="my-5 items-start max-w-full bg-yellow-600 p-3 rounded-sm font-bold">
                <p className="text-white">{error}</p>
              </div>
              ): null
        }
          <form onSubmit={update} className="space-y-8 mt-5">
            <div className="space-y-2">
              <p>Username</p>
              <Input placeholder="username" value={username}  onChange={(event) => {setUsername(event.target.value) }} /> 
            </div>
            <div className="space-y-2">
              <p>Email</p>
              <Input placeholder="email" value={email} onChange={(event) => {setEmail(event.target.value) }}/>    
            </div>
            <div className="space-y-2">
            <p>Admin</p>
              <select 
                id="isAdmin" 
                name="isAdmin"
                value={isAdmin} onChange={(e) =>(setIsAdmin(e.target.value))}
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                <option value="0">Non</option>
                <option value="1">Oui</option>
              </select> 
            </div>
            <Button className="w-full bg-red-500 hover:cursor-pointer font-semibold" type="submit">UPDATE NEW USER</Button>
            </form>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

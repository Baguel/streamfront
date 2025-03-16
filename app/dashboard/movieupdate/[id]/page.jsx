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
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  
  function update(e) {
    e.preventDefault()
    axios.put(`https://stream-back-kc0f.onrender.com/admin/update/film/${params.id}`, {
      name: name,
      url: url,
      description: description,
    }, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    }, {
    }).then((res) => {
      router.push('/dashboard/movie')
    }).catch(error => {
      console.log(error)
     
        setError(error.response.data.message)
    })
  }

  useEffect(() => {
      axios.get(`https://stream-back-kc0f.onrender.com/admin/getfilm/${params.id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      }, {
      }).then((res) => {
        setName(res.data.message.name)
        setUrl(res.data.message.url)
        setDescription(res.data.message.description)
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
              <p>Name</p>
              <Input placeholder="Name" value={name}  onChange={(event) => {setName(event.target.value) }} /> 
            </div>
            <div className="space-y-2">
              <p>Url</p>
              <Input placeholder="Url" value={url} onChange={(event) => {setUrl(event.target.value) }}/>    
            </div>
            <div className="space-y-2">
              <p>Description</p>
              <textarea rows={5} className="min-w-full"  placeholder="Url" value={description} onChange={(event) => {setDescription(event.target.value) }}/>    
            </div>
            <Button className="w-full bg-red-500 hover:cursor-pointer font-semibold" type="submit">UPDATE MOVIE</Button>
            </form>
        </div>
      </SidebarInset>
    </SidebarProvider>
   );
}

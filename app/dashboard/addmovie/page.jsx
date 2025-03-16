"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";

export default function Page() {
    const router = useRouter();
    const [name, setName] = useState('')
    const [url, setUrl] = useState('')
    const [error, setError] = useState('')

    function addmovie(e) {
        e.preventDefault()
        axios.post(`https://stream-back-kc0f.onrender.com/admin/addfilm`, {
          name: name,
          url: url
        }, {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
          }
        }, {
        }).then((res) => {
          console.log(res)
          router.push('/dashboard/movie')
        }).catch(error => {
          console.log(error)
          if (error.status == 404 || error.status === 401) {
            setError(error.response.data.message)
          }
        })
      }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>

        <div className="bg-blue-200 min-h-screen flex items-center">
          <div className="w-full">
            <h2 className="text-center text-blue-400 font-bold text-2xl uppercase mb-10">
              Add Movie
            </h2>
            <div className="bg-white p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2">
            {
                      error ? (
                        <div className="my-5 items-start max-w-full bg-yellow-600 p-3 rounded-sm font-bold">
                          <p className="text-white">{error}</p>
                        </div>
                        ): null
                }
              <form onSubmit={addmovie}>
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="block mb-2 font-bold text-gray-600"
                  >
                    Movie Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}  onChange={(event) => {setName(event.target.value) }}
                    placeholder="Put in film fullname."
                    className="border border-gray-300 shadow p-3 w-full rounded mb-"
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="url"
                    className="block mb-2 font-bold text-gray-600"
                  >
                    Trailer Url
                  </label>
                  <input
                    type="text"
                    id="url"
                    name="url"
                    value={url}  onChange={(event) => {setUrl(event.target.value) }}
                    placeholder="Put in film trailer url."
                    className="border shadow p-3 w-full rounded mb-"
                  />
                </div>

                <button
                  className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

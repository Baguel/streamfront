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
import axios from "axios"
import { useEffect, useState } from "react"
import Cookies from "js-cookie";

export default function Page() {
    const [films, setFilm] = useState([])

    function getfilm() {
        axios.get("https://stream-back-kc0f.onrender.com/admin/allfilm", {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        }).then(res => {
          setFilm(res.data.message)
          console.log(res.data.message)
        }).catch(error => {
          console.log(error)
        })
    }

    function deletefilm(id) {
      axios.delete(`https://stream-back-kc0f.onrender.com/admin/deletefilm/${id}`, {
          headers: {
              Authorization: `Bearer ${Cookies.get("token")}`
          }
      }).then(res => {
        console.log(res.data.message)
        getfilm()
      }).catch(error => {
        console.log(error)
      })
  }

    useEffect(() => {
      getfilm()
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
        <div className="flex justify-end mr-2 mb-2">
          <Link href="/dashboard/addmovie" ><button className="bg-black text-white p-1 rounded-md font-semibold hover:cursor-pointer">Add Movie</button></Link>
        </div>
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Release Year
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {films ? films.map((film)=>(  <tr key={film._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10" src={film.picture} alt="" />
                            </div>
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                    {film.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                {film.name}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                        </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {film.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {film.genre.join(",") }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                    <Link href={`/dashboard/movieupdate/${film._id}`} ><button className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">Edit</button></Link>
                        {/* <button className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">Edit</button> */}
                        <button onClick={() => {deletefilm(film._id)}} className="ml-2 text-red-600 hover:text-red-900">Delete</button>
                    </td>
                    </tr> )) : null }
            </tbody>
        </table> 
      </SidebarInset>
    </SidebarProvider>
  );
}

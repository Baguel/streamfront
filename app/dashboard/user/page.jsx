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
import axios from "axios"
import { useState, useEffect } from "react";
import Link from "next/link"
import Cookies from "js-cookie";

export default function Page() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUser()
  }, [])

  function getUser() {
    axios.get("http://localhost:3001/admin/getUser", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    }).then((res) => {
      setUsers(res.data.message)
    }).catch(error => {
      console.log(error)
    })
  }

  function deleteUser(id) {
    axios.delete(`http://localhost:3001/admin/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`
      }
    }).then((res) => {
      getUser()
    }).catch(error => {
      console.log(error)
    })
  }
  
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
          <div className="flex justify-end">
          <Link href="/dashboard/register" ><button className="bg-black text-white p-1 rounded-md font-semibold hover:cursor-pointer">Add User</button></Link>
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
                        Role
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
              {users ? users.map((user)=>( <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src="https://i.pravatar.cc/150?img=1" alt="" />
                            </div>
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                    {user.username}
                                </div>
                                <div className="text-sm text-gray-500">
                                {user.email}
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
                      {user.isAdmin ? <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Admin</span> : <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Not Admin</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap  text-sm font-medium">
                        <Link href={`/dashboard/update/${user._id}`} ><button className="text-indigo-600 hover:text-indigo-900 hover:cursor-pointer">Edit</button></Link>
                        <button onClick={() => {deleteUser(user._id)}} className="ml-2 text-red-600 hover:text-red-900">Delete</button>
                    </td>
                    </tr> )) : null }
            </tbody>
        </table>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

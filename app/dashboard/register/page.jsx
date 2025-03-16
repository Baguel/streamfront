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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useState } from "react"
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    username: z.string().min(2, {message: "2 characters needs"}),
    email: z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email."),
    password: z.string().max(8, { message: "8 characters needs." })
})

export default function Page() {
    const [error, setError] = useState('')
    const router = useRouter();
      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
          email: "",
          password: ""
        },
    })

    function onSubmit(values) {
        axios.post("https://stream-back-kc0f.onrender.com/auth/register", {
            username: values.username,
            email: values.email,
            password: values.password,
          }).then((res) => {
            router.push('/dashboard/user')
          }).catch(error => {
            if (error.status == 404 || error.status === 401) {
              setError(error.response.data.message)
            }
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
            <Breadcrumb>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex items-center justify-center">
        <div className="items-start bg-black text-white w-[800px] opacity-90 mx-auto p-15 rounded-md">
                <h1 className="font-bold text-2xl">REGISTER A NEW USER</h1>
                {
                      error ? (
                        <div className="my-5 items-start max-w-full bg-yellow-600 p-3 rounded-sm font-bold">
                          <p className="text-white">{error}</p>
                        </div>
                        ): null
                }
                <Form {...form}>
                   <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
                   <FormField
                       control={form.control}
                       name="username"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-lg">Username</FormLabel>
                           <FormControl>
                             <Input placeholder="username" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField
                       control={form.control}
                       name="email"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-lg">Email</FormLabel>
                           <FormControl>
                             <Input placeholder="email" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <FormField
                       control={form.control}
                       name="password"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-lg">Password</FormLabel>
                           <FormControl>
                             <Input type="password" placeholder="password" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <Button className="w-full bg-red-500 hover:cursor-pointer font-semibold" type="submit">ADD NEW USER</Button>
                   </form>
                 </Form>
            </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

"use client"
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
import Cookies from "js-cookie";
import Link from 'next/link'

const formSchema = z.object({
  email: z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email."),
  password: z.string().min(1, { message: "8 characters needs." }).max(8, { message: "8 characters needs." })
})

export default function ProfileForm() {
  const router = useRouter()
  const [error, setError] = useState('')
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    },
  })
 
  function onSubmit(values) {
    axios.post("https://stream-back-kc0f.onrender.com/auth/login", {
      email: values.email,
      password: values.password,
    }).then((res) => {
      Cookies.set("token", res.data.token, {
        path: "/",
      });
      router.push('/')
    }).catch(error => {
      if (error.status == 404 || error.status === 401) {
        setError(error.response.data.message)
      }
    })
  }

  return (
      <div className="w-screen h-screen bg-cover bg-no-repeat" style={{ backgroundImage: 'url("/movie-9pvmdtvz4cb0xl37.jpg")' }}>
        <div className="w-screen h-screen">
          <div className="flex items-center justify-center h-screen">
            <div className="items-start bg-black text-white w-[500px] opacity-90 mx-auto p-15 rounded-md">
                <h1 className="font-bold text-2xl">SIGN IN</h1>
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
                       name="email"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-md">Email</FormLabel>
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
                           <FormLabel className="text-md">Password</FormLabel>
                           <FormControl>
                             <Input type="password" placeholder="password" {...field} />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                       )}
                     />
                     <Button className="w-full bg-red-500 hover:cursor-pointer font-semibold" type="submit">SIGN IN</Button>
                   </form>
                 </Form>
                 <div className="flex text-center justify-center">
                  <p className="font-5xl mt-4">OR</p>
                 </div>
                  <Link href="/register" className="w-full bg-slate-500 mt-2 hover:cursor-pointer font-semibold"><button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    SIGN UP
                  </button></Link>
                 <div className="flex text-center justify-center mt-5">
                  <a href="" className="font-2xl font-semibold hover:underline">Forgot Password</a>
                 </div>
            </div>
          </div>
        </div>
    </div>
  )
}

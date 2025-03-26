// "use client";

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useState } from "react";
// import axios from "axios";
// import { useRouter } from 'next/navigation'
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form"
 
// const formSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
//   email: z.string().email( {
//     message: "This is not a valid email.",
//   }),
//   password: z.string().min(8, {
//     message: "The password must contain 8 character.",
//   }),
// })
 
// export default function RegisterForm({
//   className,
//   ...props
// }) {
 
//   const [error, setError] = useState('');
//   const router = useRouter(); 
//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//       email: "",
//       password: "",
//     },
//   })
 
//   function onSubmit(values) {
//       axios.post("https://stream-back-kc0f.onrender.com/auth/register", {
//         username: values.username,
//         email: values.email,
//         password: values.password,
//       }).then((res) => {
//         router.push('/login')
//       }).catch(error => {
//         if (error.status == 404 || error.status === 401) {
//           setError(error.response.data.message)
//         }
//       })
//     }

//   return (
//     <div className="min-h-screen bg-gray-100 p-0 sm:p-12" style={{ backgroundImage: 'url("/movie-9pvmdtvz4cb0xl37.jpg")' }}>
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
//         <h1 className="text-3xl font-semibold text-center">Register</h1>
//         {
//             error ? (
//                 <div className="my-5 items-start max-w-full bg-yellow-600 p-3 rounded-sm font-bold">
//                 <p className="text-white">{error}</p>
//                 </div>
//                 ): null
//         }
//         <FormField
//           control={form.control}
//           name="username"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Username</FormLabel>
//               <FormControl>
//                 <Input placeholder="shadcn" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input placeholder="shadcn@gmail.com" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <Input type="password" placeholder="******" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <p className="text-red-500 font-semibold">{error}</p>
//         <div className="flex justify-center">
//           <Button type="submit">Submit</Button>
//         </div>
//       </form>
//     </Form>
//     </div>
//   )
// }

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
  username: z.string().min(2, { message: "Username must be at least 2 characters."}),
  email: z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email."),
  password: z.string().min(1, { message: "8 characters needs." }).max(8, { message: "8 characters needs." })
})

export default function ProfileForm() {
  const router = useRouter()
  const [error, setError] = useState('')
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
      router.push('/login')
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
                       name="username"
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel className="text-md">Username</FormLabel>
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
                     <Button className="w-full bg-red-500 hover:cursor-pointer font-semibold" type="submit">SIGN UP</Button>
                   </form>
                 </Form>
                 <div className="flex text-center justify-center">
                  <p className="font-5xl mt-4">OR</p>
                 </div>
                  <Link href="/register" className="w-full bg-slate-500 mt-2 hover:cursor-pointer font-semibold"><button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    SIGN IN
                  </button></Link>
            </div>
          </div>
        </div>
    </div>
  )
}

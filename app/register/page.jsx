"use client";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email( {
    message: "This is not a valid email.",
  }),
  password: z.string().min(8, {
    message: "The password must contain 8 character.",
  }),
})
 
export default function RegisterForm({
  className,
  ...props
}) {
 
  const [error, setError] = useState('');
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })
 
  function onSubmit(values) {
    const username = values.username;
    const email = values.email;
    const password = values.password;
    axios.post("https://stream-back-kc0f.onrender.com/auth/register", {
      username,
      email,
      password
    }).then((response) => {
      if (response.status == 200) {
        router.push("/login");
      }
    }).catch(error => {
      if (error.status == 401) {
        setError(error.response.data.message);
      }
    });
  }
  return (
    <div className="min-h-screen bg-gray-100 p-0 sm:p-12" style={{ backgroundImage: 'url("/movie-9pvmdtvz4cb0xl37.jpg")' }}>
    <Form {...form}>
    {
      error ? (
        <div className="my-5 items-start max-w-full bg-yellow-600 p-3 rounded-sm font-bold">
          <p className="text-white">{error}</p>
        </div>
        ): null
    }
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 mx-auto max-w-md px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
        <h1 className="text-3xl font-semibold text-center">Register</h1>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn@gmail.com" {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-red-500 font-semibold">{error}</p>
        <div className="flex justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
    </div>
  )
}
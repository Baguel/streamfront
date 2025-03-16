"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import React, { useCallback } from "react";
import { FiMenu, FiSearch, FiX, FiHeart, FiHome, FiBookmark, FiTv } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie";

export default function UserUpdate() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [errors, setErrors] = useState("")
  const [old, setOld] = useState("")
  const [newpass, setNewpass] = useState("")
  const [confirmpass, setConfirm] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({})

  const router = useRouter()

  useEffect(() => {
    axios.get(`http://localhost:3001/user/user`, {
        headers: {
            'Authorization': `Bearer ${Cookies.get("token")}`
        }
        })
        .then((res) => {
            setEmail(res.data.message.email);
            setUsername(res.data.message.username);
        })
        .catch((err) => {
            console.log(err);
        });
        getUser()
}, [])

const getUser = async () => {
  await axios.get("http://localhost:3001/user/user", {
      headers: {'Authorization': `Bearer ${Cookies.get("token")}` },
    }).then(response => {
      console.log(response.data.message)
      setUser(response.data.message)
    })
      .catch(error => {
        console.error('There was an error!', error);
    });
}

function updateUser(e) {
  e.preventDefault();
  axios.put(`http://localhost:3001/user/update`,{
    username,
    email,
    password,
  }, {
    headers: {
        'Authorization': `Bearer ${Cookies.get("token")}`
    }
    })
    .then((res) => {
        router.push('/');
    })
    .catch((err) => {
      setError(err.response.data.message);
    });
}

function updateUserPass(e) {
  e.preventDefault();
  axios.put(`http://localhost:3001/user/update/pass`,{
    old: old,
    newpass: newpass,
    confirmpass: confirmpass,
  }, {
    headers: {
        'Authorization': `Bearer ${Cookies.get("token")}`
    }
    })
    .then((res) => {
        router.push('/');
    })
    .catch((err) => {
      setErrors(err.response.data.message);
    });
}
  const logout = async () => {
      Cookies.remove("token")
      router.push('/login')
  }
    return (
        <div className="bg-gray-900 text-white">
    <header className="sticky top-0 z-50 bg-gray-900 shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 dark:text-gray-200"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h1 className="text-red-600 text-3xl font-bold">KikiLand</h1>
        </div>

        <div className="flex space-x-6">
        {Object.keys(user).length === 0 ? (null) : (<div className={`md:flex items-center space-x-6 ${isMenuOpen ? "absolute top-full w-full left-0 right-0 bg-gray-700 p-4 shadow-lg" : "hidden"}`}>
            <Link href="/" className="text-white hover:text-purple-400 transition-colors">
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <FiHome /> Home
              </button>
            </Link>
            <Link href="/favorite" className="text-white hover:text-purple-400 transition-colors">
                    <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                        <FiTv /> favorite
                    </button>
                    </Link>
                    <Link href="/update" className="text-white hover:text-purple-400 transition-colors">
                    <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                        Profil
                    </button>
                    </Link>
                    <button onClick={() => logout() } className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                      Logout
                    </button>
          </div>)}
        </div>
      </nav>
    </header>
                  <div className="mt-5 md:mt-0 md:flex-grow bg-gray-900 h-screen">
                    <div className="bg-gray-900 shadow rounded-lg overflow-hidden">
                      <div className="px-4 py-5 sm:px-6 border-gray-200">
                        <div className="flex items-center justify-between">
                          <h2 className="text-lg font-medium text-white">Modifier l'utilisateur</h2>
                          <a href="/"className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                            Retour à la liste
                          </a>
                        </div>
                      </div>

                      <form className="p-6" onSubmit={updateUser}>
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Informations personnelles</h3>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                              <div className="sm:col-span-3">
                                <label for="username" className="block text-sm font-medium text-white">Nom d'utilisateur</label>
                                <div className="mt-1">
                                  <input type="text" name="username" id="username" value={username}  onChange={(e) =>(setUsername(e.target.value))} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" require />
                                </div>
                              </div>

                              <div className="sm:col-span-3">
                                <label for="email" className="block text-sm font-medium text-white">Email</label>
                                <div className="mt-1">
                                  <input type="email" name="email" id="email" value={email}  onChange={(e) =>(setEmail(e.target.value))} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" require />
                                </div>
                              </div>

                              <div className="sm:col-span-3">
                                <label for="email" className="block text-sm font-medium text-white">Password</label>
                                <div className="mt-1">
                                  <input type="password" name="password" id="password" value={password}  onChange={(e) =>(setPassword(e.target.value))} className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" require />
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                        {error && (
                          <p className="mt-5 text-red-500 font-semibold">{error}</p>
                        )}
                        <div class="pt-5 mt-6 border-t border-gray-200">
                          <div class="flex justify-end">
                            <a href="/" class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              Annuler
                            </a>
                            <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              Enregistrer
                            </button>
                          </div>
                        </div>
                      </form>

                      <form class="p-6" onSubmit={updateUserPass}>
                        <div class="space-y-6">
                          <div>
                            <h3 class="text-lg font-medium text-gray-900 mb-4">Changer son mot de passe</h3>
                            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                              <div class="sm:col-span-3">
                                <label for="username" class="block text-sm font-medium text-white">Old password</label>
                                <div class="mt-1">
                                  <input type="password" name="old" id="old" value={old}  onChange={(e) =>(setOld(e.target.value))} class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                                </div>
                              </div>

                              <div class="sm:col-span-3">
                                <label for="email" class="block text-sm font-medium text-white">New password</label>
                                <div class="mt-1">
                                  <input type="password" name="newpass" id="newpass" value={newpass}  onChange={(e) =>(setNewpass(e.target.value))} class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                                </div>
                              </div>

                              <div class="sm:col-span-3">
                                <label for="email" class="block text-sm font-medium text-white">Confirm password</label>
                                <div class="mt-1">
                                  <input type="password" name="confirm" id="confirm" value={confirmpass}  onChange={(e) =>(setConfirm(e.target.value))} class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border" />
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>
                        {errors && (
                          <p className="mt-5 text-red-500 font-semibold">{errors}</p>
                        )}
                        <div class="pt-5 mt-6 border-t border-gray-200">
                          <div class="flex justify-end">
                            <a href="/" class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              Annuler
                            </a>
                            <button type="submit" class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              Enregistrer
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
        </div>
    )
}
/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState, useCallback, useEffect } from "react";
import { FiMenu, FiSearch, FiX, FiHeart, FiHome, FiBookmark, FiTv } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link'
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [videoData, setVideoData] = useState([])
  const [videoUrl, setVideoUrl] = useState("")
  const [user, setUser] = useState("")
  const router = useRouter()  
  
  const getUser = () => {
    axios.get('http://localhost:3001/user/user',
        {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            },
        }).then((res) => { setUser(res.data.message), console.log(res.data.message) }
        )
    };

  const recupData = async () => {
        axios.get(`http://localhost:3001/user/favorite`,
        {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            },
        }).then((res) => setVideoData(res.data.message.favorite))
        .catch(error => {
            console.log(error)
        })

    return videoData
  }

  const deletefavorite = async (id) => {
    axios.delete(`http://localhost:3001/user//deletefavorite/film/${id}`,
    {
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        },
    }).then((res) => recupData())
    .catch(error => {
        console.log(error)
    })

return videoData
}

  useEffect(() => {
    recupData()
    getUser()
  }, [])
  const toggleFavorite = useCallback((videoId) => {
    setFavorites((prev) =>
      prev.includes(videoId)
        ? prev.filter((id) => id !== videoId)
        : [...prev, videoId]
    );
  }, []);

  const logout = async () => {
    Cookies.remove("token")
    router.push('/login')
  }

  const Header = () => (
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
  );

  const SearchBar = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="relative max-w-2xl mx-auto">
        <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Search for movies, TV shows..."
          className="w-full pl-12 pr-10 py-4 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
        />
        {searchQuery && (
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={() => setSearchQuery("")}
          >
            <FiX className="text-gray-400 text-xl" />
          </button>
        )}
      </div>
    </div>
  );

  const VideoGrid = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9">
        {videoData.map((video) => (
          <motion.div
            key={video._id}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 rounded-lg overflow-hidden transition-transform hover:scale-105"
          >
            <div className="relative">
              <img
                src={video.picture}
                alt={video.title}
                className="w-full h-full"
                onClick={() => {setIsModalOpen(true), setVideoUrl(video.url)}}
              />
              <button
                onClick={() => toggleFavorite(video.id)}
                className="absolute top-2 right-2 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg"
              >
                <FiHeart
                  size={20}
                  className={favorites.includes(video.id) ? "text-red-500 fill-current" : "text-gray-400"}
                />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
              <p className="text-gray-400 mb-4 line-clamp-3">{video.description}</p>
              <div className="flex items-center justify-between">
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                  {video.genre}
                </span>
                <span className="text-yellow-400">★ {video.rating}</span>
              </div>
            </div>
            <div className="flex justify-between">
                <Link href={`/moviedetail/${video._id}`}><button className="text-white px-3 py-1 rounded-full text-sm">Voir detail</button></Link>
                <button onClick={() => {deletefavorite(video._id)}} className="text-white px-3 py-1 rounded-full text-sm">Supprimer</button>
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );

  const Modal = () => (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        >
          <div className="relative w-full max-w-4xl mx-4">
            <button
              className="absolute -top-10 right-0 text-white"
              onClick={() => setIsModalOpen(false)}
            >
              <FiX className="text-3xl" />
            </button>
            <div className="aspect-video bg-black">
              <iframe
                src={videoUrl}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <SearchBar />
      <VideoGrid />
      <Modal />
    </div>
  );
};

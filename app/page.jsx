/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState, useCallback, useEffect } from "react";
import { FiMenu, FiSearch, FiX, FiHeart, FiHome, FiBookmark, FiTv } from "react-icons/fi";
import { FaPlay, FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link'
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [favorites, setFavorites] = useState(new Set());
  const [videoData, setVideoData] = useState([])
  const [videoUrl, setVideoUrl] = useState("")
  const [user, setUser] = useState({});
  const [elem, setElem] = useState("")
  const [search, setSearch] = useState([]);

  const router = useRouter();

  const logout = async () => {
      Cookies.remove("token")
      router.push('/login')
  }
  const recupData = async () => {
    const data = await fetch('https://stream-back-kc0f.onrender.com/user/film')
    const posts = await data.json()
    setVideoData(posts.message)
    return videoData
  }

  const getUser = async () => {
    await axios.get("https://stream-back-kc0f.onrender.com/user/user", {
        headers: {'Authorization': `Bearer ${Cookies.get("token")}` },
      }).then(response => {
        setUser(response.data.message)
      })
        .catch(error => {
          console.error('There was an error!', error);
      });
  }

  const searchFilm = async () => {
    console.log(elem)
    // await axios.get("https://stream-back-kc0f.onrender.com/user/user", {
    //     headers: {'Authorization': `Bearer ${Cookies.get("token")}` },
    //   }).then(response => {
    //     setUser(response.data.message)
    //   })
    //     .catch(error => {
    //       console.error('There was an error!', error);
    //   });
  }

  useEffect(() => {
    getUser()
    recupData()
  }, [])


  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const carouselData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
      title: "The Adventure Begins",
      description: "Experience the thrill of unknown adventures"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1535016120720-40c646be5580",
      title: "Mystery of the Deep",
      description: "Dive into the depths of imagination"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032",
      title: "Cosmic Journey",
      description: "Explore the vastness of space"
    }
  ];


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
        <div className="flex space-x-6">
           {Object.keys(user).length != 0 && user.isAdmin === 1 ? ( <div className="space-x-5">
             <Link href="/dashboard" className="text-white hover:text-purple-400 transition-colors"><button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">Dashboard</button></Link></div>  ) : null }
           {Object.keys(user).length === 0 ? ( <div className="space-x-5">
             <Link href="/login" className="text-white hover:text-purple-400 transition-colors"><button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">log In</button></Link>
             <Link href="/register" className="text-white hover:text-purple-400 transition-colors"><button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
             Register
           </button></Link>
           </div>  ) : (<div className={`md:flex items-center space-x-6 ${isMenuOpen ? "absolute top-full w-full left-0 right-0 bg-gray-700 p-4 shadow-lg" : "hidden"}`}>
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
        </div>
      </nav>
    </header>
  );

  const Carousel = () => (
    <div className="relative h-[60vh] md:h-[80vh] overflow-hidden ">
      {carouselData.map((slide, index) => (
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentSlide ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
            <div className="absolute bottom-20 left-10 md:left-70 text-white ">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg md:text-xl mb-6">{slide.description}</p>
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md flex items-center space-x-2">
                <FaPlay />
                <span>Play Now</span>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-purple-600" : "bg-white/50"}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );

  const SearchBar = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <form className="relative" onSubmit={searchFilm()}>
          <input
            type="text"
            placeholder="Search for movies..."
            className="w-full px-4 py-3 pr-10 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-purple-600 outline-none"
            value={elem}  onChange={(event) => {setElem(event.target.value) }}
            aria-label="Search movies"
          />
          <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </form>

        <div className="flex flex-wrap gap-4 mt-4">
          <select className="px-4 py-2 border border-gray-300 bg-white text-gray-900">
            <option value="genre"> All </option>
          </select>

          <select className="px-4 py-2 border border-gray-300 bg-white text-gray-900">
            <option value="year">Sort by Year</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
      </div>
    </div>
  );

  const VideoGrid = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videoData.map((video) => (
          <motion.div
            key={video._id}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src={video.picture}
                alt={video.name}
                className="w-full h-64 object-cover"
                onClick={() => { setIsModalOpen(true), setVideoUrl(video.url) }}
              />
              <div className="absolute top-2 right-2 flex items-center bg-black bg-opacity-75 rounded-full px-2 py-1">
                <FaStar className="text-yellow-400 mr-1" />
                <span className="text-white text-sm">rating</span>
              </div>
            </div>

            <div className="p-4">
              <h2 className="text-xl font-bold text-white mb-2">{video.name}</h2>
              <div className="flex flex-wrap gap-2 mb-2">
                  {video.genre.map((g) => (
                    <span
                      key={g}
                      className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              <p className="text-gray-400 text-sm mb-2">{video.year}</p>
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                {video.description}
              </p>
              <div className="flex items-center justify-between">
                <Link href={`/moviedetail/${video._id}`}>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    Details
                  </button>
                </Link>
                <button
                  className="p-2 rounded-full hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => toggleFavorite(video._id)}
                  aria-label={favorites.has(video._id) ? "Remove from favorites" : "Add to favorites"}
                >
                  <FaHeart
                    className={`text-2xl ${favorites.has(video._id) ? "text-red-500" : "text-gray-400"}`}
                  />
                </button>
              </div>
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
      <Carousel />
      <SearchBar />
      { !search  ? <VideoGrid /> : null}
      // <VideoGrid />
      <Modal />
    </div>
  );
};

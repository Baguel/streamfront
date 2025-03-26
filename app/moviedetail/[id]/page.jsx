/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaStar, FaShare, FaPlay } from "react-icons/fa";
import { FiMenu, FiX, FiHome, FiBookmark, FiTv } from "react-icons/fi";
import { IoAddCircleOutline } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link'
import axios, { Axios } from "axios";
import Cookies from "js-cookie";
import { Rating } from 'react-simple-star-rating'

export default function MovieDetail() {
    const params = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [valueData, setValueData] = useState([])
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [user, setUser] = useState("")
    const router = useRouter()
    
    const movieData = {
        title: "The Eternal Horizon",
        year: "2024",
        duration: "2h 35min",
        rating: 4.8,
        genres: ["Sci-Fi", "Adventure", "Drama"],
        synopsis: "In the year 2150, humanity faces its greatest challenge as dimensional portals begin appearing across Earth. Follow Dr. Sarah Chen as she leads a team of scientists and explorers into the unknown, seeking answers that could save our world.",
        cast: ["Emma Stone", "John Cho", "Zendaya", "Oscar Isaac"],
        coverImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
        posterImage: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0"
    };

 const deletcomme =(id) =>{
    axios.delete(`https://stream-back-kc0f.onrender.com/user/comment/${id}`,{
        headers: {
            Authorization: `Bearer ${Cookies.get("token")}`
        },
    }).then(
        (res) =>{
            getAllComment()
        }
    )
        
    
 }
    const getAllComment = () => {
        axios.get(`https://stream-back-kc0f.onrender.com/user/comment/movie/${params.id}`,
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                },
            }).then((res) => { setComments(res.data.result), console.log(res.data.result) }
            )
        setNewComment("");
    };
    const getUser = () => {
        axios.get('https://stream-back-kc0f.onrender.com/user/user',
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                },
            }).then((res) => { setUser(res.data.message), console.log("ok") }
            )
    };

    useEffect(() => {
        getUser()
        getAllComment()
        axios.get(`https://stream-back-kc0f.onrender.com/user/film/${params.id}`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            },
        }).then((res) => {
            console.log("ok");
            setValueData(res.data.message)
        }
        )


    }, [])

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        axios.post(`https://stream-back-kc0f.onrender.com/user/comment/${params.id}`,
            {
                comment: newComment
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                },
            }).then((res) => getAllComment() )
        setNewComment("");
    };

    const addfavorites = (id) => {
        axios.post(`https://stream-back-kc0f.onrender.com/user/addfavorite/film/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                },
            }).then((res) => console.log("ok"))
            .catch(error => {
                console.log(error)
            })
        setNewComment("");
    };

    const logout = async () => {
        Cookies.remove("token")
        router.push('/login')
    }

    const handleRating = (index) => {
        axios.post(`https://stream-back-kc0f.onrender.com/user/rate/${params.id}/${index}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                },
            }).then((res) => console.log(res.data))
            .catch(error => {
                console.log(error)
            })
    };
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
                {Object.keys(user).length === 0 ? ( <div className="space-x-5">
                    <Link href="/login" className="text-white hover:text-purple-400 transition-colors"><button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">log In</button></Link>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                    Register
                </button></div>  ) : (<div className={`md:flex items-center space-x-6 ${isMenuOpen ? "absolute top-full w-full left-0 right-0 bg-gray-700 p-4 shadow-lg" : "hidden"}`}>
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
                                src={valueData.url}
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
        <div className="min-h-screen bg-gray-900 text-white">
            <Header />
            <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
                <img
                    src={valueData.picture}
                    alt={valueData.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1485846234645-a62644f84728";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent">
                    <div className="absolute bottom-0 left-0 md:left-70 p-8 w-full">
                        <h1 className="text-5xl font-bold mb-4">{valueData.name}</h1>
                        <div className="flex items-center gap-4 mb-4">
                            <span>{valueData.year}</span>
                            <span>•</span>
                            <span>{valueData.duration}</span>
                            <span>•</span>
                            <div className="flex items-center">
                                <FaStar className="text-yellow-400 mr-1" />
                            </div>
                        </div>
                        <p>{valueData.genre}</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
                            <p className="text-gray-300 leading-relaxed">{valueData.description}</p>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">Cast</h2>
                            <div className="flex flex-wrap gap-4">
                                <p>{valueData.companies}</p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-8">
                            <button onClick={() => { setIsModalOpen(true) }} className="flex items-center gap-2 px-6 py-3 bg-purple-600 rounded-lg hover:bg-purple-700 transition">
                                <FaPlay />
                                Play Now
                            </button>
                            <button onClick={() => {addfavorites(valueData._id)}} className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                                <IoAddCircleOutline />
                                Add to favorite
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                                <FaShare />
                                Share
                            </button>
                        </div>

                        {/* Comments Section */}
                        <div className="mt-8">
                            <div className="flex my-4">
                                <form>
                                    <svg onClick={() => {handleRating(1)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(122,111,111,1)"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg>
                                </form>
                                <form>
                                    <svg onClick={() => {handleRating(2)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(122,111,111,1)"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg>
                                </form>
                                <form>
                                    <svg onClick={() => {handleRating(3)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(122,111,111,1)"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg>
                                </form>
                                <form>
                                    <svg onClick={() => {handleRating(4)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(122,111,111,1)"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg>
                                </form>
                                <form>
                                    <svg onClick={() => {handleRating(5)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="rgba(122,111,111,1)"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"></path></svg>
                                </form>
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Comments</h2>
                            <form onSubmit={handleCommentSubmit} className="mb-6">
                                <div className="flex gap-4">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Share your thoughts about this movie..."
                                        className="flex-1 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
                                    >
                                        Comment
                                    </button>
                                </div>
                            </form>

                            <div className="space-y-4 max-h-[500px] overflow-y-auto">
                                {comments.map((comment) => (
                                    <div
                                        key={comment._id}
                                        className="bg-gray-800 p-4 rounded-lg"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <img
                                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
                                                alt="user"
                                                className="w-10 h-10 rounded-full"
                                                onError={(e) => {
                                                    e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde";
                                                }}
                                            />
                                            <div>
                                                <h4 className="font-semibold">{comment.userID.username}</h4>
                                                <p className="text-sm text-gray-400">
                                                    {comment.time}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-gray-300">{comment.comment}</p>
                                     {
                                      comment.userID.username===user.username? (                                        <div class="flex justify-between items-center rounded-md shadow-sm">
                                        <button
                                            class="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-l-lg font-medium inline-flex space-x-1 items-center">
                                            <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor" class="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                            </svg>
                                            </span>
                                            <span class="hidden md:inline-block">Edit</span>
                                        </button>
                                        <button onClick={() => {deletcomme(comment._id)}}
                                            class="text-slate-800 hover:text-blue-600 text-sm bg-white hover:bg-slate-100 border border-slate-200 rounded-r-lg font-medium inline-flex space-x-1 items-center">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                    stroke="currentColor" class="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </span>
                                            <span class="hidden md:inline-block">Delete</span>
                                        </button>
                                    </div>) :null
                                        
                                        
                                     }

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Related Movies */}
                    <div className="lg:col-span-1">
                        <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="bg-gray-800 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition"
                                >
                                    <img
                                        src={`https://images.unsplash.com/photo-1536440136628-849c177e76a1?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=${item}&q=80&w=400`}
                                        alt="Related Movie"
                                        className="w-full h-40 object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://images.unsplash.com/photo-1485846234645-a62644f84728";
                                        }}
                                    />
                                    <div className="p-4">
                                        <h3 className="font-semibold mb-2">Similar Movie {item}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <span>2024</span>
                                            <span>•</span>
                                            <span>2h 15m</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal />
        </div>
    );
};
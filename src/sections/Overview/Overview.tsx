import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import mainlogo from "../../assets/mainlogo.png"
import { FaMapMarkedAlt } from "react-icons/fa"
import MapBackground from "../../components/ui/MapBackground"
import { useNavigate } from "react-router-dom"

export default function Overview() {
    const navigate = useNavigate()
    const [openSearch, setOpenSearch] = useState(false)
    const btnRef1 = useRef<HTMLButtonElement>(null)
    const btnRef2 = useRef<HTMLButtonElement>(null)
    
    // 📱 મોબાઈલ માટે ડિફોલ્ટ શેડો ફિક્સ રાખ્યો (નીચેની તરફ સહેજ પડછાયો)
    const [shadow1, setShadow1] = useState({ x: 0, y: 12 })
    const [shadow2, setShadow2] = useState({ x: 0, y: 12 })

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            // 📱 જો સ્ક્રીન મોબાઈલ સાઈઝની હોય (width < 640px) તો માઉસ મૂવમેન્ટ ટ્રેક ન કરવી
            if (window.innerWidth < 640) {
                setShadow1({ x: 0, y: 12 })
                setShadow2({ x: 0, y: 12 })
                return // અહીંથી જ ફંક્શન અટકી જશે, નીચેનું લોજિક રન નહીં થાય
            }

            // 🔘 બટન ૧ (Learn More) - માત્ર ડેસ્કટોપ પર જ શેડો મૂવ થશે
            if (btnRef1.current) {
                const rect = btnRef1.current.getBoundingClientRect()
                const btnCenterX = rect.left + rect.width / 2
                const btnCenterY = rect.top + rect.height / 2

                const deltaX = e.clientX - btnCenterX
                const deltaY = e.clientY - btnCenterY

                const maxOffset = 20 
                const shadowX = Math.max(-maxOffset, Math.min(maxOffset, -deltaX * 0.03))
                const shadowY = Math.max(-maxOffset, Math.min(maxOffset, -deltaY * 0.03))
                setShadow1({ x: shadowX, y: shadowY + 10 }) 
            }

            // 🔘 બટન ૨ (Sign In) - માત્ર ડેસ્કટોપ પર જ શેડો મૂવ થશે
            if (btnRef2.current) {
                const rect = btnRef2.current.getBoundingClientRect()
                const btnCenterX = rect.left + rect.width / 2
                const btnCenterY = rect.top + rect.height / 2

                const deltaX = e.clientX - btnCenterX
                const deltaY = e.clientY - btnCenterY

                const maxOffset = 20
                const shadowX = Math.max(-maxOffset, Math.min(maxOffset, -deltaX * 0.03))
                const shadowY = Math.max(-maxOffset, Math.min(maxOffset, -deltaY * 0.03))
                setShadow2({ x: shadowX, y: shadowY + 10 })
            }
        }

        // 🌍 ગ્લોબલ ઇવેન્ટ લિસનર્સ
        window.addEventListener("mousemove", handleGlobalMouseMove)
        
        // 🔄 જો કોઈ ડેસ્કટોપમાંથી વિન્ડો નાની કરીને મોબાઈલ વ્યુમાં જાય તો શેડો રીસેટ કરવા માટે
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setShadow1({ x: 0, y: 12 })
                setShadow2({ x: 0, y: 12 })
            }
        }
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("mousemove", handleGlobalMouseMove)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <div className="w-full min-h-screen flex justify-center items-center overflow-x-hidden bg-slate-950 p-4 relative transition-colors duration-500">

            {/* 🗺️ મેપ અને લાઈટિંગ કમ્પોનન્ટ */}
            <MapBackground active={openSearch} />

            <section className="w-full max-w-4xl flex justify-center items-center z-10">
                <div className="w-full flex justify-center items-center flex-col gap-8">

                    {/* 🔍 મેઇન સેક્શન કન્ટેનર */}
                    <div className="flex flex-col sm:flex-row justify-center items-center relative min-h-95 sm:min-h-65 w-full max-w-md sm:max-w-3xl gap-6 sm:gap-0">

                        {/* 🃏 ૩ ઇમેજ કાર્ડ સ્ટેક સેક્શન */}
                        <AnimatePresence>
                            {openSearch && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="absolute top-0 sm:top-auto sm:left-4 md:-left-44 flex justify-center items-center h-40 w-full sm:w-auto"
                                >
                                    <div className="relative w-52 sm:w-60 h-32 sm:h-36 flex justify-center items-center">
                                        <motion.div
                                            initial={{ y: 0, rotate: 0 }}
                                            animate={{ y: -5, rotate: 12, x: 15 }}
                                            className="w-full h-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 absolute z-10 origin-bottom"
                                        >
                                            <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80" alt="House 1" className="w-full h-full object-cover rounded-2xl" />
                                        </motion.div>

                                        <motion.div
                                            initial={{ y: 0 }}
                                            animate={{ y: -15, x: 0 }}
                                            className="w-full h-full bg-white rounded-2xl shadow-2xl border border-gray-100 absolute z-20"
                                        >
                                            <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80" alt="House 2" className="w-full h-full object-cover rounded-2xl" />
                                        </motion.div>

                                        <motion.div
                                            initial={{ y: 0, rotate: 0 }}
                                            animate={{ y: -5, rotate: -12, x: -15 }}
                                            className="w-full h-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 absolute z-30 origin-bottom"
                                        >
                                            <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=400&q=80" alt="House 3" className="w-full h-full object-cover rounded-2xl" />
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* 🖼️ મેઇન લોગો */}
                        <motion.img
                            src={mainlogo}
                            alt="Main Logo"
                            onClick={() => setOpenSearch(prev => !prev)}
                            animate={{
                                x: openSearch ? (window.innerWidth < 640 ? 0 : -80) : 0,
                                y: openSearch ? (window.innerWidth < 640 ? 40 : 0) : 0
                            }}
                            transition={{ type: "spring", stiffness: 180, damping: 20 }}
                            whileHover={{ scale: 0.98 }}
                            whileTap={{ scale: 0.95 }}
                            className="h-36 sm:h-36 md:h-52 z-40 outline-none cursor-pointer object-contain mt-32 sm:mt-0 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                        />

                        {/* 🔍 સર્ચ બાર */}
                        <AnimatePresence>
                            {openSearch && (
                                <motion.div
                                    initial={{ width: 0, opacity: 0, y: window.innerWidth < 640 ? 60 : 0 }}
                                    animate={{
                                        width: window.innerWidth < 640 ? "92%" : 560,
                                        x: window.innerWidth < 640 ? 0 : 130,
                                        opacity: 1,
                                        y: window.innerWidth < 640 ? 110 : 0
                                    }}
                                    exit={{ width: 0, opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 180, damping: 20 }}
                                    className="h-12 md:h-14 z-30 bg-gray-50 backdrop-blur-md rounded-xl  flex items-center shadow-2xl absolute sm:left-1/2 text-black"
                                >
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.15 }}
                                        className="w-full h-full overflow-hidden flex items-center gap-2 p-3"
                                    >
                                        <FaMapMarkedAlt size={22} className="text-sky-400 shrink-0" />
                                        <input
                                            type="text"
                                            placeholder="Search Area..."
                                            className="w-full h-full font-semibold text-base bg-transparent focus:outline-none text-gray-800 placeholder-slate-400"
                                        />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* 📱 અહીં મેં w-120 ને બદલે w-[92%] sm:w-120 કર્યું છે જેથી ફોનમાં બટન સ્ક્રીન સરસ ફિટ થાય */}
                <div className="absolute bottom-60 h-13 w-[92%] sm:w-120 p-1 gap-2 flex justify-between duration-300 items-center z-50">

                    <button
                        ref={btnRef1}
                        style={{
                            boxShadow: `${shadow1.x}px ${shadow1.y}px 25px rgba(2, 6, 23, 0.45)`,
                            transition: window.innerWidth < 640 ? "none" : "box-shadow 0.15s ease-out"
                        }}
                        className="w-full h-full rounded-2xl text-white font-bold text-md backdrop-blur-md bg-blue-400 cursor-pointer hover:bg-blue-500 duration-300"
                    >
                        Learn More
                    </button>

                    <button
                        ref={btnRef2}
                        onClick={() => navigate("/login")}
                        style={{
                            boxShadow: `${shadow2.x}px ${shadow2.y}px 25px rgba(2, 6, 23, 0.45)`,
                            transition: window.innerWidth < 640 ? "none" : "box-shadow 0.15s ease-out"
                        }}
                        className="w-full h-full rounded-2xl text-white font-bold text-md backdrop-blur-md bg-linear-to-br from-red-600 to-red-400 cursor-pointer hover:from-red-500 hover:to-red-600 duration-300"
                    >
                        Sign In
                    </button>

                </div>
            </section>
        </div>
    )
}
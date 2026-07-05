import { motion } from "motion/react";
import bg from "../assets/uneekints life style.jpg";
import { FaLock } from "react-icons/fa";
// Tamara Input component no path barabar chhe te check kari lejo
import Input from "../components/commen/Input";
import Button from "../components/commen/Button";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: any) => {
        e.preventDefault();
        setLoading(true); // Loading shuru thayu

        // API call ke fake delay (2 second no timeout check karva mate)
        setTimeout(() => {
            setLoading(false); // 2 second pachi loading bandh thai jashe
        }, 2000);
    };
    return (
        // Parent container: Image ne inline style thi set kari chhe
        <motion.div
            className="relative w-screen h-screen flex justify-center lg:justify-center lg:gap-16 items-center overflow-hidden"

        >
            <div className="absolute size-full bg-linear-to-r from-cyan-50 to-gray-50"></div>

            <motion.div
                className="relative z-10 w-full max-w-sm lg:max-w-md px-8 py-10 backdrop-blur-lg shadow-2xl bg-gray-100/60 shadow-gray-900/50 rounded-3xl border border-white/40 flex flex-col justify-center items-center"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col justify-center items-center gap-3 mb-8">
                    <div className="w-16 h-16 rounded-2xl flex justify-center items-center bg-yellow-500 shadow-lg shadow-yellow-500/50">
                        <FaLock size={26} className="text-white" />
                    </div>
                    <h1 className="text-4xl text-gray-800 font-extrabold drop-shadow-md">
                        Login
                    </h1>
                </div>

                {/* Form */}
                <form className="w-full flex flex-col justify-center items-center gap-5" onSubmit={handleLogin}>
                    <div className="w-full">
                        <Input type="email" placeholder="Email Address" />
                    </div>

                    <div className="w-full">
                        <Input type="password" placeholder="Password" />
                    </div>

                    {/* Login Button (Tamari jaruriyat mujab sudhari shako chho) */}
                    <Button type="submit" isLoading={loading}>
                        Sign In
                    </Button>
                    <div className={`w-full flex justify-center items-center`}>
                        <p>You can create accoount <Link to={"/signup"} className={`text-blue-700`}> Sign up</Link></p>
                    </div>
                </form>
            </motion.div>

            {/* Blank/Info Box (Right Side - Only visible on large screens) */}
            <motion.div
                className="relative z-10 hidden lg:flex flex-col justify-center items-center w-120 xl:w-160 h-140    border-2 border-white/30 backdrop-blur-md bg-black/20 rounded-3xl p-10 shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {/* Tame ahiya logo ke koi text add kari shako chho */}
                <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg text-center">
                    Welcome Back!
                </h2>
                <p className="text-white/80 text-lg text-center">
                    Discover the unique lifestyle with us.
                </p>
            </motion.div>

        </motion.div>
    );
}
import { motion } from "motion/react";
import { FaLock } from "react-icons/fa";
import Input from "../components/commen/Input";
import Button from "../components/commen/Button";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner"; // મેસેજ બતાવવા માટે

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    const [password, setPassword] = useState<string>("");
    const [formError, setFormError] = useState<string>("");

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setFormError("");
        setLoading(true);

        try {
            const res = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setFormError(data.message || "Login failed");
                toast.error(data.message || "Login failed");
                return;
            }

            toast.success("Login Successful!");
            setTimeout(() => {
                navigate("/dashboard"); 
            }, 1500);
        } catch (error) {
            toast.error("Server સાથે કનેક્ટ ન થઈ શકાયું: " + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div className="relative w-screen h-screen flex justify-center lg:justify-center lg:gap-16 items-center overflow-hidden">
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
                    <h1 className="text-4xl text-gray-800 font-extrabold drop-shadow-md">Login</h1>
                </div>

                {/* Form */}
                <form className="w-full flex flex-col justify-center items-center gap-5" onSubmit={handleLogin}>
                    {formError && (
                        <div className="w-full text-xs font-bold px-2 p-2 rounded-md border text-red-600 bg-red-50/50 border-red-200">
                            ⚠️ {formError}
                        </div>
                    )}

                    <div className="w-full">
                        <Input 
                            type="email" 
                            placeholder="Email Address" 
                            value={email}
                            onChange={(e: any) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="w-full">
                        <Input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e: any) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <Button type="submit" isLoading={loading}>
                        Sign In
                    </Button>
                    
                    <div className="w-full flex justify-center items-center">
                        <p className="text-gray-700 font-medium">
                            Don't have an account? <Link to="/signup" className="text-blue-700 font-bold underline">Sign up</Link>
                        </p>
                    </div>
                </form>
            </motion.div>

            {/* Info Box */}
            <motion.div
                className="relative z-10 hidden lg:flex flex-col justify-center items-center w-120 xl:w-160 h-140 border-2 border-white/30 backdrop-blur-md bg-black/20 rounded-3xl p-10 shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg text-center">Welcome Back!</h2>
                <p className="text-white/80 text-lg text-center">Discover the unique lifestyle with us.</p>
            </motion.div>
        </motion.div>
    );
}
import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import bg from "../assets/uneekints life style.jpg";

// Components
import Input from "../components/commen/Input";
import Button from "../components/commen/Button";

// Types
interface SignupFormData {
    fullName: string;
    email: string;
    password: string;
}

interface SignupApiResponse {
    message: string;
    email: string;
    fullName: string;
}

interface ErrorApiResponse {
    message?: string;
    errors?: { field: string; message: string }[];
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string; // e.g. http://localhost:3333

export default function Signup() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [sendingOtp, setSendingOtp] = useState<boolean>(false);
    const [step, setStep] = useState<"form" | "otp">("form");
    const [formError, setFormError] = useState<string>("");

    const [formData, setFormData] = useState<SignupFormData>({
        fullName: "",
        email: "",
        password: "",
    });
    const [passwordError, setPasswordError] = useState<string>("");

    // OTP related state
    const [enteredOtp, setEnteredOtp] = useState<string>("");
    const [otpError, setOtpError] = useState<string>("");
    const [resendTimer, setResendTimer] = useState<number>(0);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "password") {
            validatePassword(value);
        }
    };

    const validatePassword = (value: string): boolean => {
        if (!value) {
            setPasswordError("Password is required");
            return false;
        }
        if (value.length < 8) {
            setPasswordError("Password ocha ma ocha 8 aksar no hovo joie.");
            return false;
        }
        const hasLetter = /[a-zA-Z]/.test(value);
        if (!hasLetter) {
            setPasswordError("Password ma ocha ma ocha ek letter hovo joie.");
            return false;
        }
        const hasSpecialOrOperator = /[-+*/=<>!@#$%^&*()_+[\]{}|;:',./?`~]/.test(value);
        if (!hasSpecialOrOperator) {
            setPasswordError("Password ma ek character ke operator hovo joie.");
            return false;
        }

        setPasswordError("");
        return true;
    };

    const startResendTimer = () => {
        setResendTimer(30);
        const interval = setInterval(() => {
            setResendTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const parseErrorMessage = async (res: Response): Promise<string> => {
        try {
            const data: ErrorApiResponse = await res.json();
            if (data.errors && data.errors.length > 0) {
                return data.errors[0].message;
            }
            return data.message || "Kaink khotu thayu chhe. Ferithi try karo.";
        } catch {
            return "Kaink khotu thayu chhe. Ferithi try karo.";
        }
    };

    // Step 1: Submit form -> backend /signup (backend j email mokle chhe have)
    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();
        setFormError("");

        const isValid = validatePassword(formData.password);
        if (!isValid) return;

        if (!formData.fullName || !formData.email) return;

        setSendingOtp(true);
        try {
            const res = await fetch(`${API_BASE_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const message = await parseErrorMessage(res);
                setFormError(message);
                return;
            }

            const data: SignupApiResponse = await res.json();
            console.log("Signup success:", data);

            setStep("otp");
            startResendTimer();
        } catch (error) {
            console.error("Signup failed:", error);
            setFormError("Server saathe connect na thai shakyu. Ferithi try karo.");
        } finally {
            setSendingOtp(false);
        }
    };

    // Step 2: Resend OTP -> backend j navo OTP email kare chhe
    const handleResendOtp = async () => {
        if (resendTimer > 0) return;

        setSendingOtp(true);
        setOtpError("");
        try {
            const res = await fetch(`${API_BASE_URL}/resend-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email }),
            });

            if (!res.ok) {
                const message = await parseErrorMessage(res);
                setOtpError(message);
                return;
            }

            startResendTimer();
        } catch (error) {
            console.error("Resend OTP failed:", error);
            setOtpError("OTP resend na thayo. Ferithi try karo.");
        } finally {
            setSendingOtp(false);
        }
    };

    // Step 2: Verify OTP -> backend /verify-otp -> complete signup
    const handleVerifyOtp = async (e: FormEvent) => {
        e.preventDefault();
        setOtpError("");

        if (!enteredOtp) {
            setOtpError("OTP nakho.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/verify-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: formData.email, otp: enteredOtp }),
            });

            if (!res.ok) {
                const message = await parseErrorMessage(res);
                setOtpError(message);
                return;
            }

            alert("Signup Successful!");
            navigate("/login");
        } catch (error) {
            console.error("OTP verification failed:", error);
            setOtpError("Server saathe connect na thai shakyu. Ferithi try karo.");
        } finally {
            setLoading(false);
        }
    };

    return (
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
                <div className="flex flex-col justify-center items-center gap-3 mb-6">
                    <div className="w-16 h-16 rounded-2xl flex justify-center items-center bg-yellow-500 shadow-lg shadow-yellow-500/50">
                        <FaUserPlus size={26} className="text-white" />
                    </div>
                    <h1 className="text-4xl text-gray-800 font-extrabold drop-shadow-md">
                        {step === "form" ? "Sign Up" : "Verify Email"}
                    </h1>
                    {step === "otp" && (
                        <p className="text-sm text-gray-700 text-center px-2">
                            Amē <span className="font-bold">{formData.email}</span> par 6-digit code moklyo chhe.
                        </p>
                    )}
                </div>

                {step === "form" ? (
                    <form onSubmit={handleSignup} className="w-full flex flex-col justify-center items-center gap-4">
                        {formError && (
                            <div className="w-full text-xs font-bold px-2 p-2 rounded-md border text-red-600 bg-red-50/50 border-red-200">
                                ⚠️ {formError}
                            </div>
                        )}

                        <div className="w-full">
                            <Input
                                type="text"
                                name="fullName"
                                placeholder="Full Name"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="w-full">
                            <Input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="w-full">
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required
                            />
                            {formData.password.length > 0 && (
                                <p className={`text-xs font-bold mt-2 px-2 p-1 rounded-md border ${passwordError
                                        ? "text-red-600 bg-red-50/50 border-red-200"
                                        : "text-green-600 bg-green-50/50 border-green-200"
                                    }`}>
                                    {passwordError ? `⚠️ ${passwordError}` : "✅ Password is strong!"}
                                </p>
                            )}
                        </div>

                        <div className="w-full mt-2">
                            <Button type="submit" isLoading={sendingOtp} disabled={!!passwordError}>
                                Send Verification Code
                            </Button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp} className="w-full flex flex-col justify-center items-center gap-4">
                        <div className="w-full">
                            <Input
                                type="text"
                                name="otp"
                                placeholder="Enter 6-digit OTP"
                                value={enteredOtp}
                                onChange={(e) => setEnteredOtp(e.target.value)}
                                maxLength={6}
                                required
                            />
                            {otpError && (
                                <p className="text-xs font-bold mt-2 px-2 p-1 rounded-md border text-red-600 bg-red-50/50 border-red-200">
                                    ⚠️ {otpError}
                                </p>
                            )}
                        </div>

                        <div className="w-full mt-2">
                            <Button type="submit" isLoading={loading}>
                                Verify & Create Account
                            </Button>
                        </div>

                        <div className="flex justify-between w-full text-sm mt-1">
                            <button
                                type="button"
                                onClick={() => setStep("form")}
                                className="text-gray-600 hover:text-gray-800 font-medium underline"
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={resendTimer > 0 || sendingOtp}
                                className="text-yellow-600 hover:text-yellow-700 font-bold underline disabled:opacity-50 disabled:no-underline"
                            >
                                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
                            </button>
                        </div>
                    </form>
                )}

                <p className="mt-6 text-gray-700 font-medium">
                    Already have an account?{" "}
                    <Link to="/login" className="text-yellow-600 hover:text-yellow-700 font-bold underline transition-colors">
                        Login here
                    </Link>
                </p>
            </motion.div>

            {/* Right Info Box */}
            <motion.div
                className="relative z-10 hidden lg:flex flex-col justify-center items-center w-120 xl:w-160 h-140 border-2 border-white/30 backdrop-blur-md bg-black/20 rounded-3xl p-10 shadow-2xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg text-center">
                    Join Our Community!
                </h2>
                <p className="text-white/80 text-lg text-center">
                    Sign up to unlock exclusive lifestyle features and connect with like-minded people.
                </p>
            </motion.div>
        </motion.div>
    );
}
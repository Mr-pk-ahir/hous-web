import { motion } from "framer-motion"
import { useMemo, useEffect, useState } from "react"

interface MapBackgroundProps {
    active: boolean
}

export default function MapBackground({ active }: MapBackgroundProps) {
    const [isMobile, setIsMobile] = useState(false)

    // મોબાઇલ સ્ક્રીન સાઈઝ ડિટેક્ટ કરવા માટે
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // 🎯 SVG કોઓર્ડિનેટ્સનું મેઇન સેન્ટર (લોગો પોઝિશન)
    const baseTargetX = 1000
    const baseTargetY = isMobile ? 1120 : 1000

    // જ્યારે લોગો મૂવ થાય, ત્યારે કનેક્શન પોઇન્ટ પણ સ્મૂથલી શિફ્ટ થશે
    const targetX = active && !isMobile ? baseTargetX - 80 : baseTargetX
    const targetY = active && isMobile ? baseTargetY + 40 : baseTargetY

    // 🕸️ મશીન સર્કિટ અને સિટી ગ્રીડ સ્ટાઇલની ૫૦ લાઇનો જનરેટ કરવાનું લોજિક
    const circuitLines = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => {
            // સ્ક્રીનની ચારેય બાજુથી રેન્ડમ સ્ટાર્ટિંગ પોઇન્ટ્સ
            const edge = i % 4
            let startX = 0
            let startY = 0
            const padding = 100

            if (edge === 0) { { /* ટોપ એજ */ } startX = Math.random() * 2000; startY = -padding; }
            else if (edge === 1) { { /* રાઇટ એજ */ } startX = 2000 + padding; startY = Math.random() * 2000; }
            else if (edge === 2) { { /* બોટમ એજ */ } startX = Math.random() * 2000; startY = 2000 + padding; }
            else { { /* લેફ્ટ એજ */ } startX = -padding; startY = Math.random() * 2000; }

            const midX = startX + (1000 - startX) * (0.3 + Math.random() * 0.4)
            const midY = startY

            const midX2 = midX
            const midY2 = baseTargetY + (startY - baseTargetY) * 0.2

            const colors = ["#2563eb", "#3b82f6", "#1d4ed8", "#38bdf8", "#60a5fa"]
            const lightColor = colors[i % colors.length]
            const duration = 4 + Math.random() * 4
            const hasLight = i % 2 === 0

            return { startX, startY, midX, midY, midX2, midY2, lightColor, hasLight, duration }
        })
    }, [baseTargetY])

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-50 pointer-events-none flex justify-center items-center">
            
            <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-size-[50px_50px]" />

            <svg 
                className="absolute w-[2000px] h-[2000px] max-w-none" 
                viewBox="0 0 2000 2000" 
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                {circuitLines.map((line, i) => {
                    const pathData = `M ${line.startX} ${line.startY} L ${line.midX} ${line.midY} L ${line.midX2} ${line.midY2} L ${targetX} ${targetY}`

                    return (
                        <g key={i}>
                            <motion.path
                                animate={{ d: pathData }}
                                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                                fill="none"
                                stroke="#e2e8f0"
                                strokeWidth="1"
                                className="opacity-90"
                            />
                            <circle cx={line.startX} cy={line.startY} r="3" fill="#cbd5e1" />

                            {line.hasLight && active && (
                                <motion.path
                                    initial={{ strokeDashoffset: 2500 }}
                                    animate={{
                                        d: pathData,
                                        strokeDashoffset: [2500, 0] // લાઇન જે દિશામાં જાય છે ત્યાં જ લાઈટ ફોલો કરશે
                                    }}
                                    transition={{
                                        d: { type: "spring", stiffness: 180, damping: 22 },
                                        strokeDashoffset: { repeat: Infinity, duration: line.duration, ease: "linear" }
                                    }}
                                    fill="none"
                                    stroke={line.lightColor}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeDasharray="25 2500" 
                                />
                            )}
                        </g>
                    )
                })}

                <motion.circle 
                    animate={{ cx: targetX, cy: targetY }}
                    transition={{ type: "spring", stiffness: 180, damping: 22 }}
                    r="45" 
                    fill="none" 
                    stroke="#94a3b8" 
                    strokeWidth="1" 
                    strokeDasharray="5 5"
                    className="opacity-40 animate-spin-slow"
                />
            </svg>

            {/* ✨ સર્ચ ઓપન થતા જ હળવો કાચ જેવો ઓવરલે */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: active ? 0.3 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-white/40 backdrop-blur-[0.5px]"
            />
        </div>
    )
}
import React from "react";

interface EmailTemplateProps {
    fullName: string;
    otp: string;
}

export default function EmailTemplate({ fullName, otp }: EmailTemplateProps) {
    return (
        <div
            style={{
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                backgroundColor: "#f4f4f7",
                color: "#333333",
                margin: 0,
                padding: "40px 20px",
                minHeight: "100%",
                width: "100%",
            }}
        >
            <div
                style={{
                    maxWidth: "500px",
                    margin: "0 auto",
                    backgroundColor: "#ffffff",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #e1e4e8",
                }}
            >
                {/* Header Banner */}
                <div
                    style={{
                        backgroundColor: "#eab308", // Yellow-500 (તમારી થીમ પ્રમાણે)
                        padding: "30px 20px",
                        textAlign: "center",
                    }}
                >
                    <h1
                        style={{
                            color: "#ffffff",
                            margin: 0,
                            fontSize: "26px",
                            fontWeight: "bold",
                            letterSpacing: "0.5px",
                        }}
                    >
                        HOUS LIFESTYLE
                    </h1>
                </div>

                {/* Content Body */}
                <div style={{ padding: "40px 30px" }}>
                    <h2
                        style={{
                            fontSize: "20px",
                            color: "#1f2937",
                            marginTop: 0,
                            marginBottom: "16px",
                        }}
                    >
                        નમસ્તે {fullName}, 🙏
                    </h2>
                    <p
                        style={{
                            fontSize: "15px",
                            lineHeight: "1.6",
                            color: "#4b5563",
                            marginBottom: "24px",
                        }}
                    >
                        HOUS કમ્યુનિટીમાં જોડાવા બદલ તમારો આભાર! તમારું એકાઉન્ટ વેરિફાય કરવા માટે નીચે આપેલા 6-ડિજિટના OTP (Verification Code) નો ઉપયોગ કરો:
                    </p>

                    {/* OTP Box */}
                    <div
                        style={{
                            backgroundColor: "#fef9c3", // Yellow-100 bg
                            border: "2px dashed #ca8a04", // Yellow-600 border
                            borderRadius: "12px",
                            padding: "20px",
                            textAlign: "center",
                            margin: "30px 0",
                        }}
                    >
                        <span
                            style={{
                                fontSize: "36px",
                                fontWeight: "bold",
                                letterSpacing: "8px",
                                color: "#854d0e", // Yellow-800 text
                                display: "inline-block",
                            }}
                        >
                            {otp}
                        </span>
                    </div>

                    <p
                        style={{
                            fontSize: "13px",
                            color: "#ef4444",
                            fontWeight: "500",
                            marginBottom: "0",
                        }}
                    >
                        ⚠️ આ કોડ ફક્ત 10 મિનિટ માટે જ વેલિડ છે. કૃપા કરીને આ કોડ કોઈની પણ સાથે શેર કરશો નહીં.
                    </p>
                </div>

                {/* Footer */}
                <div
                    style={{
                        backgroundColor: "#f9fafb",
                        padding: "20px 30px",
                        textAlign: "center",
                        borderTop: "1px solid #f3f4f6",
                    }}
                >
                    <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                        જો તમે આ રિકવેસ્ટ નથી કરી, તો તમે આ ઇમેઇલને ઇગ્નોર કરી શકો છો.
                    </p>
                    <p
                        style={{
                            fontSize: "12px",
                            color: "#9ca3af",
                            marginTop: "8px",
                            marginBottom: 0,
                        }}
                    >
                        © {new Date().getFullYear()} HOUS Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
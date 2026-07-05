import React, { useState, useRef } from 'react';

export default function OtpInput({ onVerify }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    let newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && index < 5) inputRefs.current[index + 1].focus();
  };

  return (
    <div className="flex justify-center gap-2">
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          className="w-12 h-12 text-center text-xl font-bold border rounded-xl focus:border-yellow-500 outline-none"
          value={data}
          onChange={(e) => handleChange(e.target, index)}
          ref={(el) => (inputRefs.current[index] = el)}
        />
      ))}
    </div>
  );
}
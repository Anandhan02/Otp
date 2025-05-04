import React, { useRef, useState } from 'react';

const OtpInput = () => {
  const [otp, setOtp] = useState(Array(4).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, '');
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault(); // Prevent default behavior
  
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
  
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 4).replace(/\D/g, '').split('');
    const newOtp = [...otp];
    pasteData.forEach((digit, i) => {
      if (i < 4) newOtp[i] = digit;
    });
    setOtp(newOtp);

    const nextIndex = pasteData.length < 4 ? pasteData.length : 3;
    inputsRef.current[nextIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-4 mb-4" onPaste={handlePaste}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength="1"
          className="w-12 h-14 text-center border rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={digit}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(el) => (inputsRef.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default OtpInput;

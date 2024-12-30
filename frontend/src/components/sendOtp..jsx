import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const SendOtp = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false); // To track OTP sent status
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email.trim()) {
      setMessage("Please enter a valid email.");
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:3001/api/otp', { email });
      setMessage(response.data.message);
      setOtpSent(true); // Mark OTP as sent
    } catch (error) {
      setMessage(error.response?.data?.error || "Error sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      setMessage("Please enter the OTP.");
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:3001/api/verify-otp', { email, otp });
      setMessage(response.data.message);
      navigate('/home');
      // Redirect on successful verification
    } catch (error) {
      setMessage(error.response?.data?.error || "Error verifying OTP");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: '#f8f9fa' }}
    >
      <div className="text-center p-4 border rounded shadow bg-white">
        <h2 className="mb-4">{otpSent ? "Verify OTP" : "Send OTP"}</h2>
        {!otpSent ? (
          <>
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-primary mb-3" onClick={handleSendOtp}>
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button className="btn btn-primary mb-3" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          </>
        )}
        <p className="text-muted">{message}</p>
      </div>
    </div>
  );
};

export default SendOtp;

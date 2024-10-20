import React, { useState } from 'react';
import axios from 'axios';
import './VerifyCertificate.css'; // Import the CSS file for styling

function VerifyCertificate() {
  const [certificateId, setCertificateId] = useState(''); // State to hold the certificate ID
  const [data, setData] = useState(null); // State to hold the response data
  const [message, setMessage] = useState(''); // State to hold messages

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      const response = await axios.get(`https://vulcure-certification.vercel.app/api/certificates/verify/${certificateId}`);
      setData(response.data.certificate); // Set the certificate data
      setMessage('Certificate verified successfully!');
    } catch (error) {
      console.log(error);
      setMessage('Something went wrong. Please check the Certificate ID.');
      setData(null); // Reset data if there was an error
    }
  };

  return (
    <div className="verify-certificate-container">
      <h1>Verify Your Certificate</h1>
      <p>Enter your certificate number below to verify your certificate.</p>
      <form onSubmit={handleSubmit} className="verify-form">
        <label>
          <input
            type="text"
            placeholder='Enter your Certificate ID...'
            value={certificateId}
            onChange={(e) => setCertificateId(e.target.value)} // Update the state with input value
            required
            className="input-field"
          />
        </label>
        <button type="submit" className="verify-button">Verify</button>
      </form>
      {message && <p className="message">{message}</p>} {/* Display success/error messages */}
      {data && (
        <div className="certificate-details">
          <h2>Certificate Details</h2>
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Course:</strong> {data.course}</p>
          <p><strong>Certificate ID:</strong> {data.certificateId}</p>
          <p><strong>Date:</strong> {new Date(data.date).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}

export default VerifyCertificate;

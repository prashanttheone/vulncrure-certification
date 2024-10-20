import React, { useState } from 'react';
import axios from 'axios';
import './CertificateForm.css'; // Import the CSS file for styling

const CertificateForm = () => {
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [message, setMessage] = useState('');

    const handleDownload = async (certificateId) => {
        try {
            const response = await axios.get(`https://vulcure-certification.vercel.app/api/certificates/download/${certificateId}`, {
                responseType: 'blob', // Important for handling binary data
            });

            // Create a Blob from the response data
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);

            // Create a link element and trigger a download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${certificateId}.pdf`); // The name for the downloaded file
            document.body.appendChild(link);
            link.click(); // Trigger the download
            link.parentNode.removeChild(link); // Clean up the DOM

            // Revoke the object URL after the download
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading certificate:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://vulcure-certification.vercel.app/api/certificates/generate', {
                name,
                course,
            });

            setMessage('Certificate generated successfully!');
            handleDownload(response.data.certificateId);
            setName("")
            setCourse("")
        } catch (error) {
            setMessage('Error generating certificate. Please try again.');
        }
    };

    return (
        <div className="certificate-form-container">
            <h2>Generate Certificate</h2>
            <form onSubmit={handleSubmit} className="certificate-form">
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>Course:</label>
                    <input
                        type="text"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button">Generate and Download Certificate</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default CertificateForm;

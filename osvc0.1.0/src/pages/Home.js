import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
    const [packageName, setPackageName] = useState('');
    const [packageVersion, setPackageVersion] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        // Clear previous results or errors
        setResult(null);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/vulnerabilities/analyze-package', {
                packageName,
                packageVersion,
            });

            // Update state with the backend response
            setResult(response.data);
        } catch (err) {
            // Handle errors
            console.error(err);
            setError('Failed to analyze vulnerabilities. Please try again.');
        }
    };

    return (
        <div>
            <h1>Software Module Risk Scanner</h1>
            <div className="content">
                <p>Enter your package details or upload a dependency file to analyze vulnerabilities</p>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="package-name">Package Name:</label>
                        <input
                            type="text"
                            id="package-name"
                            name="package-name"
                            placeholder="e.g., react"
                            value={packageName}
                            onChange={(e) => setPackageName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="package-version">Package Version:</label>
                        <input
                            type="text"
                            id="package-version"
                            name="package-version"
                            placeholder="e.g., 17.0.2"
                            value={packageVersion}
                            onChange={(e) => setPackageVersion(e.target.value)}
                        />
                    </div>

                    <div>
                        <button type="submit">Analyze Vulnerabilities</button>
                    </div>
                </form>
            </div>

            {/* Display Results */}
            <div>
                {result && (
                    <div>
                        <h2>Results:</h2>
                        <p><strong>Severity Level:</strong> {result.severity}</p>
                        <img
                            src={`data:image/png;base64,${result.chart}`}
                            alt="Severity Pie Chart"
                            style={{ width: '300px', height: '300px' }}
                        />
                    </div>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
};

export default Home;

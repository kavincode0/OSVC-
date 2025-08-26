const express = require('express');
const axios = require('axios');
const router = express.Router();
const cors = require('cors');

// Middleware to parse JSON body data
router.use(cors());
router.use(express.json());

// Root route handler for testing
router.get('/', (req, res) => {
    res.send('Vulnerabilities route is working');
});

// POST route to analyze vulnerabilities for packageName/version (OSV API integration)
router.post('/analyze-package', async (req, res) => {
    const { packageName, packageVersion } = req.body;

    console.log('Incoming Request:', req.body)

    try {
        // Query OSV API to get vulnerabilities
        
        const response = await axios.post('https://api.osv.dev/v1/query', {
            package: { name: packageName },
            version: packageVersion,
        });
        
        // Extracting the severity of each vulnerability
        const severities = response.data.vulns.map(vuln => vuln.database_specific?.severity?.toLowerCase());

        // Initialize counters for each severity level
        let severityCount = {
            critical: 0,
            high: 0,
            medium: 0,
            low: 0
        };

        // Iterate over the severities and count them
        severities.forEach(severity => {
            if (severity === 'critical') {
                severityCount.critical += 1;
            } else if (severity === 'high') {
                severityCount.high += 1;
            } else if (severity === 'medium' || severity === 'moderate') {
                severityCount.medium += 1;
            } else if (severity === 'low') {
                severityCount.low += 1;
            }
        });

                // Now send the severity count to the Python FastAPI server for further analysis
        const analyzeResponse = await axios.post('http://127.0.0.1:5001/analyze', severityCount);
        
        // Send the analysis result from FastAPI to the frontend
        res.json(analyzeResponse.data)
        

    } catch (error) {
        console.error('Error analyzing vulnerabilities:', error.message || error);
        //res.status(500).send('Error analyzing vulnerabilities');
    }
});

module.exports = router; // Export the router

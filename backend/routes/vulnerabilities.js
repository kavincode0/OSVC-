const express = require('express');
const axios = require('axios');
const router = express.Router(); // Define the router

// Analyze Vulnerabilities Endpoint
router.post('/analyze', async (req, res) => {
    const { packageName, packageVersion } = req.body;

    try {
        // OSV API Call
        const response = await axios.post('https://api.osv.dev/v1/query', {
            package: { name: packageName },
            version: packageVersion
        });

        // Send back the response from the OSV API
        res.json(response.data);
    } catch (error) {
        console.error('Error analyzing vulnerabilities:', error.message);
        res.status(500).send('Error analyzing vulnerabilities');
    }
});

// Export the router
module.exports = router;

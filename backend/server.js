const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
const vulnerabilitiesRoute = require('./routes/vulnerabilities');
app.use('/api/v1/vulnerabilities', vulnerabilitiesRoute);

// Test Root Route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

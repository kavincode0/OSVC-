const express = require('express');
const cors = require('cors');
const vulnerabilitiesRouter = require('./routes/vulnerabilities'); // Correct the path to vulnerabilities router

const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('Server is running');
});

// Middleware
app.use(cors({origin: '*'}));
app.use(express.json());

// Mount the vulnerabilities router
app.use('/vulnerabilities', vulnerabilitiesRouter);

// Start the Express server
app.listen(port, () => {
    console.log(`Express server running on http://localhost:${port}`);
});

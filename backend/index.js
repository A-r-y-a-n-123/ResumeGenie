const fs = require('fs');
const pdf = require('pdf-parse');
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const app = express();

app.use(express.json());

// Set up multer to store uploaded files temporarily in 'uploads/' folder
const upload = multer({ dest: 'uploads/' });

// POST endpoint: Upload resume + job description
app.post('/score', upload.single('resume'), async (req, res) => {
    const jobDescription = req.body.jobDescription;
    const file = req.file;

    if (!file || !jobDescription) {
        return res.status(400).json({ error: "Both resume file and job description are required." });
    }

    try {
        // Read and parse PDF
        const fileBuffer = fs.readFileSync(file.path);
        const data = await pdf(fileBuffer);
        const resumeText = data.text;

        // Send to Python scoring API
        const response = await axios.post('http://localhost:8000/score', {
            resume: resumeText,
            job_description: jobDescription
        });

        // Delete the uploaded file after processing
        fs.unlinkSync(file.path);

        // Return score from Python API
        res.json(response.data);
    } catch (error) {
        console.error("Error processing resume:", error.message);
        res.status(500).json({ error: "Failed to process the resume." });
    }
});

// Start the server
app.listen(5000, () => {
    console.log("Node.js server running on port 5000");
});

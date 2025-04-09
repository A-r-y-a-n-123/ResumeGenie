const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const axios = require('axios');
const fs = require('fs');

const app = express();

// ⚠️ Don't use express.json() when using form-data via multer
const upload = multer({ dest: 'uploads/' });

app.post('/score', upload.single('resume'), async (req, res) => {
    try {
        const jobDescription = req.body.jobDescription;
        const file = req.file;

        if (!jobDescription || !file) {
            return res.status(400).json({ error: "Both jobDescription and resume file are required." });
        }

        const buffer = fs.readFileSync(file.path);
        const data = await pdf(buffer);
        const resumeText = data.text;

        // Send to FastAPI
        const response = await axios.post('http://localhost:8000/score', {
            resume: resumeText,
            job_description: jobDescription
        });

        fs.unlinkSync(file.path); // cleanup
        res.json(response.data);
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(5000, () => {
    console.log("✅ Node.js server running on port 5000");
});

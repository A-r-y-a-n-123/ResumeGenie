require("dotenv").config(); // security purpose
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer"); // for storage
const pdfParse = require("pdf-parse"); // for parsing content
const mammoth = require("mammoth"); // for parsing content
const { analyzeResume } = require("./utils/aiAnalysis"); // calling analysis logic from other file

const app = express();
app.use(express.json()); // middleware
app.use(cors()); // crossorigin 

// using async to wait before performing next operations it will sync as per given condition

mongoose
  .connect(process.env.DBURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const storage = multer.memoryStorage();
const upload = multer({ storage });

const Resume = mongoose.model("Resume", {
  name: String,
  email: String,
  text: String,
  score: Number,
  suggestions: [String],
});

app.post("/upload", upload.single("resume"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  try {
    let text = "";
    if (req.file.mimetype === "application/pdf") {
      text = (await pdfParse(req.file.buffer)).text;
    } else if (req.file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
      text = (await mammoth.extractRawText({ buffer: req.file.buffer })).value;
    } else {
      return res.status(400).json({ error: "Unsupported file format" });
    }

    // Analyzing resume
    const { score, suggestions } = await analyzeResume(text);

    // Saving credentials
    const newResume = new Resume({ name: req.body.name, email: req.body.email, text, score, suggestions });
    await newResume.save();

    res.json({ message: "Resume analyzed successfully", score, suggestions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

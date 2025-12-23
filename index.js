const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.json({ status: "Snaperase API is running 🚀" });
});

/* 1️⃣ Image background remover */
app.post("/api/image/bg-remove", upload.single("image"), (req, res) => {
  res.json({
    message: "Background remove API ready",
    file: req.file?.filename,
  });
});

/* 2️⃣ Image enhancer */
app.post("/api/image/enhance", upload.single("image"), (req, res) => {
  res.json({
    message: "Image enhancement API ready",
  });
});

/* 3️⃣ Video shorts maker */
app.post("/api/video/shorts", (req, res) => {
  const { url } = req.body;
  res.json({
    message: "Video shorts API ready",
    video: url,
  });
});

/* 4️⃣ File / link processor */
app.post("/api/process", upload.single("file"), (req, res) => {
  res.json({
    message: "File processing API ready",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Snaperase running on port ${PORT}`)
);

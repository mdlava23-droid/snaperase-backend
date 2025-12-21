const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("API is running");
});

const PORT = process.env.PORT;

if (!PORT) {
  console.error("PORT not found");
  process.exit(1);
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});


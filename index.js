const express = require("express");
require("dotenv").config()

const app = express();
const PORT = process.env.PORT;
console.log(PORT)

// middleware supaya bisa baca JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", require("./routes/auth.routes"))

// route test
app.get("/tes", (req, res) => {
  res.send("Server hidup 🚀");
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});

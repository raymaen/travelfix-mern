const express = require("express");
const app = express();
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require("./routes/api/auth");
const userRoutes = require("./routes/api/users");
const webcamRoutes = require("./routes/api/webcams");

const db = config.get("mongoURI");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("DB connected succesfully!"))
  .catch(err => console.log("Db connection error"));

const port = process.env.PORT || "5000";

// Body parser
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/webcams", webcamRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, "client", "build")))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server started on port ${port}`));

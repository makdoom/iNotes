const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const errorHandler = require("./utils/errorHandler");
const createError = require("http-errors");

// Connection to DB
connectDB();

const PORT = process.env.PORT || 5000;

// Middlewares
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Routes
app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/notes", require("./routes/noteRoutes"));

app.use(async (req, res, next) => {
  next(createError.NotFound("This route doesn't exists"));
});

app.use(errorHandler);
// Server lister
app.listen(PORT, () =>
  console.log(`Server up & running at http://localhost:${PORT}`)
);

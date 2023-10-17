// imports
const path = require("path");
const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");

const corsOptions = require("./config/corsOptions");

app.use(logger);
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3500;

app.use(errorHandler);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

//routes
app.use(express.static(path.join(__dirname, "/public")));
// app.use("/subdir", require("./routes/subdir"));
app.use("/", require("./routes/root"));

app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));

app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "view", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 json not found" });
  } else if (req.accepts("txt")) {
    res.type("txt").send("404 text not found");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

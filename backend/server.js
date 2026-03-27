const app = require("./app");

// ENV FILE CONFIGURATION
const dotenv = require("dotenv");
dotenv.config({path: "./config/.env"});

// DATABASE CONNECTION
const connectDatabase = require("./config/db");
connectDatabase();

// PORT CONFIGURATION
const PORT = process.env.PORT || 5000;

// SERVER START
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
})
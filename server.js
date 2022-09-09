
const express = require('express');
const htmlRoutes = require("./routes/htmlRoutes")
const apiRoutes = require("./routes/apiRoutes")


const app = express();

const PORT = process.env.PORT || 3001

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

//HTML Routes
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
//API Routes

app.listen(PORT, () => console.log(`Live at http://localhost:${PORT}`))






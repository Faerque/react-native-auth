const express = require('express');
const dotenv = require('dotenv');
const UserRoute = require('./routers/user.route.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./utils/dbConnect.js');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
dotenv.config();
connectDB();

app.get('/', (req, res) => {
    res.send(`Server is running at ${PORT}`);
});

app.use("/api/v1/users", UserRoute);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
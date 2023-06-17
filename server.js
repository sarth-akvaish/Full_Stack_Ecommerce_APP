import express from "express"
import colors from 'colors'
import dotenv from 'dotenv'
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import cors from 'cors';
// config env 
dotenv.config();

// database connection 
connectDB();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use('/api/v1/auth', authRoutes);

//rest api
app.get('/', (req, res) => {
    res.send({
        msg: "Welcome to ecommerce website"
    })
})

// PORT 
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server ruuning ${process.env.DEV_MODE} on ${PORT}`.bgCyan.white);
})
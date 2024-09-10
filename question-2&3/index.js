const express = require("express");
const app = express();
const PORT = 5000;
const connectToMongo = require("./db");
const router = require("./routes/index");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToMongo();

app.use('/api', router);

app.listen(PORT, (req,res)=>{
    console.log("server running on port" + PORT);
});

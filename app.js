import express from 'express';

const app = express();

app.use(express.json());



app.use((req, res)=>{
    res.status(404).json({
        success:false,
        message:"Route not found"
    })
})
export default app;
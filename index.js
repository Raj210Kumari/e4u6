const express = require("express")

const { connection } = require("./config/db")
const {userRouter} = require("./routes/app.route")
const {postRoute}= require("./routes/post.route")
const {authenticate}=require("./middleware/authenticator")

const PORT=process.env.port
const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Social Media App")
})

app.use("/users", userRouter)
app.use(authenticate)
app.use("/post", postRoute)

app.listen(PORT,async()=>{
    try {
        await connection
        console.log("Server is connected to DB")
        console.log("Server is runnig on port 8080")
    } catch (err) {
        console.log("ERROR connecting to DB")
        console.log(err)
    }
})


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2M2M1MWIyNDU3NzkyMDM5YzU0NmNiZjIiLCJpYXQiOjE2NzM4NjMzOTN9._UP9lTrdZ9TlkP7jjG5y8T7w5qtBQ9VTjL2RgDsw5H4
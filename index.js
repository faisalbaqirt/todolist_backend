const express = require("express")
const app = express()
const cors = require("cors")
const passport = require("./lib/passport")

app.use(express.json())
app.use(cors())
app.use(passport.initialize())


const AuthRoute = require("./routes/AuthRoute")
app.use("/api/v1/auth", AuthRoute)

const TodoRoute = require("./routes/TodoRoute")
app.use("/api/v1/todolist", TodoRoute)

const port = process.env.PORT || 5000;

app.listen(port, ()=> {
    console.log(`Listening on port ${port}`)
})
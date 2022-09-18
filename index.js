const express = require("express")
const cors = require("cors")

const apiEndPoint = require("./routes/api")

const app = express()
app.use(cors())

app.get("/", (req, res) => {
  res.json({ message: "hello piece :)"})
})

app.use("/api", apiEndPoint)

app.listen(process.env.PORT || 4000, () => console.log("server start at port:", process.env.PORT || 4000))
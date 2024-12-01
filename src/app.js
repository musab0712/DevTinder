const expess = require("express");

const app = expess();

app.get("/user", (req, res) => {
    res.send("heelo from server...")
});

app.use("/", (req, res) => {
    res.send("heelo from server...")
})

app.listen(3000, ()=>{
    console.log("server started at 3000 port....")
})
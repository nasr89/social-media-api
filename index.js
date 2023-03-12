const express = require("express");
const app = express();

const DB = require("./database").connectDB;

// Import routes
const userRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");
const followSystemRouter = require("./routers/followSystemRouter");
DB();

app.use(express.json());

app.use("/api/registration", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/user", followSystemRouter);

app.listen(3000, () => {
  console.log("listening on port 3000");
});

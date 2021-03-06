/*** Setup ***/
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const candiesRouter = require("./routes/candies");
const bakeriesRouter = require("./routes/bakeries");
const userRoutes = require("./routes/users");
const orderRoutes = require("./routes/orders");
const db = require("./db/models");
const path = require("path");
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

const app = express();
const mediaPath = path.join(__dirname, "media");

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(userRoutes);
app.use("/candies", candiesRouter);
app.use("/bakeries", bakeriesRouter);
app.use("/media", express.static(mediaPath));
app.use(userRoutes);
app.use(orderRoutes);

// NOT FOUND PATH MIDDLEWARE
app.use((req, res, next) => {
  res.status(404).json({ message: "Path Not Found!" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

const run = async () => {
  try {
    // await db.sequelize.sync();
    await db.sequelize.sync({ alter: true });
    // await db.sequelize.sync({ force: true });

    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();

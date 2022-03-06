const express = require("express");
const cookie_session = require("cookie-session");
const { json } = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();

app.set("trust proxy", true);
app.use(json());
app.use(cors());
app.use(cookie_session({ signed: false, secure: false }));

const { database_connection } = require("./db_connection/db_connection");
const { configs } = require("./configs/configuration");
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

database_connection();
app.listen(configs.PORT, () => {
  console.log(`server is listening on port:${configs.PORT}`);
});

const admin_route = require("./routes/admin_auth_route");
const blog_route = require("./routes/blog_route");
const cat_route = require("./routes/category_route");
const slider_route = require("./routes/slider_route");
const country_route = require("./routes/countries_route");
app.use("/api/user", admin_route);
app.use("/api/blog", blog_route);
app.use("/api/category", cat_route);
app.use("/api/slider", slider_route);
app.use("/api/country", country_route);
app.all("*", async (req, res) => {
  return res.status(201).json({ message: "invalid route" });
});

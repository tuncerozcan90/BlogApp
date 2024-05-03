// express
const express = require("express");
const app = express();

const cookieParser = require('cookie-parser');
const csurf = require("csurf");
const sessionConfig = require("./session-config");

// node modules
const path = require("path");

// routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

// custom modules
const locals = require("./middlewares/locals");
const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data");

// template engine
app.set("view engine", "ejs");

// models
const Category = require("./models/category");
const Blog = require("./models/blog");
const User = require("./models/user");
const Role = require("./models/role");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionConfig);

app.use(locals);
app.use(csurf());

app.use("/libs", express.static(path.join(__dirname, "node_modules")));
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use("/account", authRoutes);
app.use(userRoutes); 

app.use((err, req, res, next) => {
    console.log("loglama", err.message);    // loglama => winston
    // email
    next(err);
});

app.use((err, req, res, next) => {
    res.status(500).render("error/500", { title: "hata sayfası "});
});

Blog.belongsTo(User, {
    foreignKey: {
        allowNull: true
    }
});
User.hasMany(Blog);

Blog.belongsToMany(Category, { through: "blogCategories"});
Category.belongsToMany(Blog, { through: "blogCategories"});
Role.belongsToMany(User, {through: "userRoles"});
User.belongsToMany(Role, {through: "userRoles"});


(async () => {
    //    await sequelize.sync({ force: true });
    //    await dummyData();
})();

app.listen(3000, function() {
    console.log("listening on port 3000");
});


  
  
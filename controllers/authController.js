const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fsPromises = require("fs").promises;
const path = require("path");

require("dotenv").config();

// prettier-ignore
const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({ "message": "Username and password required!" });
  }
  const foundUser = usersDB.users.find((person) => person.username === user);

  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(pwd, foundUser.password);

  // prettier-ignore
  if (match) {
    const accessToken = jwt.sign
    (
      {"username": foundUser.username},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "30s"}
    );

    const refreshToken = jwt.sign
    (
      {"username": foundUser.username},
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "1d"}
    );
    res.json({ "success": `User ${user} logged in` });

    const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
    const currentUser = {...foundUser, refreshToken};
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile
    (
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );

    res.json({accessToken});
    res.cookie("jwt", refreshToken, {http: })

  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };

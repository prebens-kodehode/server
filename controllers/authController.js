const User = require("../model/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const fsPromises = require("fs").promises;
// const path = require("path");

require("dotenv").config();

// prettier-ignore
const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({ "message": "Username and password required!" });
  }
  const foundUser = await User.findOne({username: user}).exec()

  if (!foundUser) return res.sendStatus(401);

  const match = await bcrypt.compare(pwd, foundUser.password);

  // prettier-ignore
  if (match) {
    const roles = Object.values(foundUser.roles)
    const accessToken = jwt.sign
    (
      {"UserInfo":
      {
        "username": foundUser.username,
        "roles": roles
      }
    },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "30s"}
    );

    const refreshToken = jwt.sign
    (
      {"UserInfo":
      {
        "username": foundUser.username,
        "roles": roles
      }
    },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "1d"}
    );
    res.json({ "success": `User ${user} logged in` });

   
    res.cookie("jwt", refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
    res.json({accessToken});

    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()
    console.log(result);
    

  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };

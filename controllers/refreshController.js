const User = require("../model/User");

const jwt = require("jsonwebtoken");

require("dotenv").config();

// prettier-ignore
const handleRefresh = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    
    const foundUser = await User.findOne({refreshToken}).exec()
  
    if (!foundUser) return res.sendStatus(403);

    const roles = Object.values(foundUser.UserInfo.roles);
  //prettier-ignore
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => 
        {
            if(err || foundUser.username !== decoded.UserInfo.username) return res.sendStatus(403);
            const accessToken = jwt.sign
            (
              {"UserInfo":
              {
                "username": decoded.UserInfo.username,
                "roles": decoded.UserInfo.roles
              }
            },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: "30s"}
            );
            res.json({accessToken})
        }
    )
  };

module.exports = { handleRefresh };

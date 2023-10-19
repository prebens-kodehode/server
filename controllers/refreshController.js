const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const jwt = require("jsonwebtoken");

require("dotenv").config();

// prettier-ignore
const handleRefresh = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt;

    
    const foundUser = usersDB.users.find((person) => person.refreshToken === refreshToken);
  
    if (!foundUser) return res.sendStatus(403);

    const roles = Object.values(foundUser.roles);
  //prettier-ignore
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => 
        {
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign
            (
              {"UserInfo":
              {
                "username": decoded.username,
                "roles": roles
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

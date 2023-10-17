const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");

// prettier-ignore
const handleLogout = async (req, res) => {
      const cookies = req.cookies;
      if (!cookies?.jwt) return res.status(204);
      const refreshToken = cookies.jwt;
  
      
      const foundUser = usersDB.users.find((person) => person.refreshToken === refreshToken);
    
      if (!foundUser) {
        res.clearCookie("jwt", {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        return res.sendStatus(204);
      }
    //prettier-ignore
    const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
    const currentUser = {...foundUser, refreshToken};
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile
    (
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(usersDB.users)
    );
    res.clearCookie("jwt", {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
    return res.sendStatus(204);
    };

module.exports = { handleLogout };

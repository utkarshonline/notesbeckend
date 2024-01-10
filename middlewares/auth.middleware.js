const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decoded = jwt.verify(token, "masai");
      if (decoded) {
        req.body.userID = decoded.userID;
        req.body.username = decoded.username;
        // console.log(decoded);
        next();
      } else {
        res.json({ msg: "you are not authorized" });
      }
    } catch (err) {
      res.json({ error: err });
    }
  }
};

module.exports = {
  auth,
};

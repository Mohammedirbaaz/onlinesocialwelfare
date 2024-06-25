const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });

    const verified = jwt.verify(token, "wG8@nZ9#pU9+nX2)eI6}aQ2&hY5@k");
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });

    req.user = verified.id;
    
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
const jwt = require("jsonwebtoken");
const helperWrapper = require("../helpers/wrapper");
const redis = require("../config/redis");

module.exports = {
  authentication: (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
      return helperWrapper.response(res, 403, "Please login first!");
    }
    token = token.split(" ")[1];

    if (!error && result !== null) {
      return helperWrapper.response(
        res,
        403,
        "Your token is destroyed, please login again"
      );
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, resultJwt) => {
      if (err) {
        return helperWrapper.response(res, 403, "Invalid signature");
      }
      req.decodeToken = resultJwt;
      next();
    });
    // eslint-disable-next-line no-console
    console.log("Authentication process");
    // next();
  },
};

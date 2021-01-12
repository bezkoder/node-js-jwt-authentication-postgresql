const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

verifyToken = async (req, res, next) => {

  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.userId);
  if (user) {
    const roles = await user.getRoles();
    if (roles) {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    }
  }
}

isModerator = async (req, res, next) => {

  const user = await User.findByPk(req.userId);
  if (user) {
    const roles = await user.getRoles();
    if (roles) {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Require Moderator Role!"
      });
    }

  }
}

isModeratorOrAdmin = async (req, res, next) => {

  const user = await User.findByPk(req.userId);
  if (user) {
    const roles = await user.getRoles();
    if (roles) {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
        res.status(403).send({
          message: "Require Moderator or Admin Role!"
        });
      }
    }
  }
}

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;

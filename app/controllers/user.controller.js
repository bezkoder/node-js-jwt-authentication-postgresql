const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.allUsers = (req, res) => {
  // return all the users from sequelize and return only the username and blood_group
  User.findAll({
    attributes: ['username', 'blood_group']
  })
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}
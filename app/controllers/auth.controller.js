const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;


exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10)
    });
    if (user) {
      if (req.body.roles) {
        const role = await Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        });
        if (role) {
          await user.setRoles(roles)
          res.send({ message: "User registered successfully!" });
        }

      } else {
        // user role = 1
        const setRoles = await user.setRoles([1]);
        res.send({ message: "User registered successfully!" });

      }
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }


};

exports.signin = async (req, res) => {

  try {
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = await bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = await jwt.sign({ id: user.id }, process.env.SESSION_SECRET, {
      expiresIn: 86400 // 24 hours
    });

    const authorities = [];
    const roles = await user.getRoles()
    if (roles) {
      for (let i = 0; i < roles.length; i++) {
        authorities.push("ROLE_" + roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
      });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }

}

import { config } from "../config/db.config";

import { Dialect, Sequelize } from "sequelize";
import { initRole, Role } from "./role.model";
import { initUsers, User } from "./user.model";
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect as Dialect,
    //operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

export const db = {
  user: User,
  role: Role,
  sequelize,
  ROLES: ["user", "admin", "moderator"]
};
initUsers(sequelize);
initRole(sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});


import { DataTypes, Model, Sequelize } from "sequelize";
import { Role } from "./role.model";

export class User extends Model {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  setRoles!: (roles: (Role | number)[]) => Promise<void>;
  getRoles!: () => Promise<Role[]>
}
export function initUsers(sequelize: Sequelize) {
  User.init({
    username: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    tableName: "users"
  });

}
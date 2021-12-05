import { DataTypes, Model, Sequelize } from 'sequelize';
export class Role extends Model {
  id!: number;
  name!: string;
}
export function initRole(sequelize: Sequelize) {

  Role.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    }
  },
    {
      sequelize,
      tableName: 'roles'
    });
  return Role;
};

import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class TeamsModel extends Model {
  declare id: number;
  declare teamName: string;
}

TeamsModel.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  freezeTableName: true,
  timestamps: false,
});

export default TeamsModel;

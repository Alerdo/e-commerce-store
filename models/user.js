import { Model, DataTypes } from 'sequelize';

class User extends Model {
    static initialize(sequelize) {
        this.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                name: DataTypes.STRING,
                address: DataTypes.TEXT,
                registration_date: DataTypes.DATE,
                createdAt: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW, // Automatically set to the current timestamp on create
                    field: 'createdAt'  // Explicitly specifying database's column name
                },
                updatedAt: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW, // Automatically set to the current timestamp on update
                    field: 'updatedAt'  // Explicitly specifying database's column name
                },
            },
            {
                sequelize,
                modelName: 'user',
                tableName: 'users',
                underscored: false,  // Turned off underscored as your database columns are not in snake_case
            }
        );
    }
}

export default User;

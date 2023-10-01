import { Model, DataTypes } from 'sequelize';


class UserModel extends Model {
    static initialize(sequelize) {
        this.init({
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
        }, {
            sequelize,
            modelName: 'user',
            tableName: 'users',
            underscored: true,
        });
        
    }
}

export default UserModel;

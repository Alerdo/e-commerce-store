import { Model, DataTypes } from 'sequelize';

class Cart extends Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id'
                },
                field: 'user_id',  // Explicitly specify the database's column name
            },
            creation_date: {
                type: DataTypes.DATE,
                field: 'creation_date'  // Explicitly specify the database's column name
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                field: 'createdAt'  // Explicitly specify the database's column name
            },
            updatedAt:  {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                field: 'updatedAt'  // Explicitly specify the database's column name
            }
        }, {
            sequelize,
            modelName: 'cart',
            tableName: 'carts',
            underscored: false,  // Turn off underscored as your database columns are not in snake_case
        });
    }
}

export default Cart;

import { Model, DataTypes } from 'sequelize';

class CartModel extends Model {
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
            },
            creation_date: DataTypes.DATE,
        }, {
            sequelize,
            modelName: 'cart',
            tableName: 'carts',
            underscored: true,
        });
    }
}

export default CartModel;

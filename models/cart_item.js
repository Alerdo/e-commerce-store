import { Model, DataTypes } from 'sequelize';

class CartItemModel extends Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            cart_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'carts',
                    key: 'id'
                },
            },
            product_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'products',
                    key: 'id'
                },
            },
            quantity: DataTypes.INTEGER,
        }, {
            sequelize,
            modelName: 'cartItem',
            tableName: 'cart_items',
            underscored: true,
        });
    }
}

export default CartItemModel;

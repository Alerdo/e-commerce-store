import { Model, DataTypes } from 'sequelize';

class CartItem extends Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            cartId: {
                field: 'cart_id', // maps `cartId` to `cart_id` in the database
                type: DataTypes.INTEGER,
                references: {
                    model: 'carts',
                    key: 'id'
                },
            },
            productId: {
                field: 'product_id', // maps `productId` to `product_id` in the database
                type: DataTypes.INTEGER,
                references: {
                    model: 'products',
                    key: 'id'
                },
            },
            quantity: DataTypes.INTEGER,
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        }, {
            sequelize,
            modelName: 'cartItem',
            tableName: 'cart_items',
            underscored: false, // Since your columns are in camelCase, set this to false
        });
    }
}

export default CartItem;

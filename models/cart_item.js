import { Model, DataTypes } from 'sequelize';

class CartItem extends Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            cartId: { // changed from `cart_id` to `cartId`
                field: 'cart_id', // maps `cartId` to `cart_id` in the database
                type: DataTypes.INTEGER,
                references: {
                    model: 'carts',
                    key: 'id'
                },
            },
            productId: { // changed from `product_id` to `productId`
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
                field: 'created_at' // added this line
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                field: 'updated_at' // added this line
            },
        }, {
            sequelize,
            modelName: 'cartItem',
            tableName: 'cart_items',
            underscored: true, // This option auto-generates snake_case column names from camelCase attribute names
        });
    }
}

export default CartItem;

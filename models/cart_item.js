import { Model, DataTypes } from 'sequelize';

class CartItem extends Model {
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
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW, // Automatically set to the current timestamp on create
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW, // Automatically set to the current timestamp on update
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

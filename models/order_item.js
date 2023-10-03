import { Model, DataTypes } from 'sequelize';

class OrderItem extends Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            order_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'orders',
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
            price_at_time_of_purchase: DataTypes.FLOAT,
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
            modelName: 'orderItem',
            tableName: 'order_items',
            underscored: false, // Since your columns are in camelCase, set this to false
        });
    }
}

export default OrderItem;

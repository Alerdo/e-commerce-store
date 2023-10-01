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
        }, {
            sequelize,
            modelName: 'orderItem',
            tableName: 'order_items',
            underscored: true,
        });

    }
}

export default OrderItem;

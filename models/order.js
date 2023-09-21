import { Model, DataTypes } from 'sequelize';

class Order extends Model {
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
            order_date: DataTypes.DATE,
            shipping_address: DataTypes.TEXT,
            status: DataTypes.STRING,
        }, {
            sequelize,
            modelName: 'order',
            tableName: 'orders',
            underscored: true,
        });
    }
}

export default Order;

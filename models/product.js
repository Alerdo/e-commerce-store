import { Model, DataTypes } from 'sequelize';

class Product extends Model {
    static initialize(sequelize) {
        this.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            description: DataTypes.TEXT,
            price: DataTypes.FLOAT,
            stock_quantity: DataTypes.INTEGER,
            image_url: DataTypes.STRING,
        }, {
            sequelize,
            modelName: 'product',
            tableName: 'products',
            underscored: true,
        });
    }
}

export default Product;

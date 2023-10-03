export const up =  async (queryInterface, Sequelize) => {
  await queryInterface.createTable('products', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    price: {
      allowNull: false,
      type: Sequelize.DECIMAL(10, 2)
    },
    stock_quantity: {
      allowNull: false,
      type: Sequelize.INTEGER
    },
    image_url: {
      type: Sequelize.STRING
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE
    }
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable('products');
};

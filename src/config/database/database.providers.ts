import { Sequelize } from 'sequelize-typescript';
import { OrderItems } from 'src/modules/orders/model/order-items.models';
import { Orders } from 'src/modules/orders/model/orders.model';
import { Water_products } from 'src/modules/products/models/waterProduct.model';
import { User } from 'src/modules/user/models/user.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        logging: console.log,
        define: {
          // Disable automatic index creation for timestamps
          timestamps: false,
          // Disable automatic plural table names
          freezeTableName: true,
        },
      });

      try {
        // Test the connection
        await sequelize.authenticate();
        console.log('✅ Database connection has been established successfully.');

        // Add models and sync
        sequelize.addModels([User, Orders, OrderItems, Water_products]);
        // await sequelize.sync({ force: false });
        // await sequelize.sync({ alter: true });
        // await Water_products.sync({ alter: true });
        // await User.sync({ alter: true });
        // await Orders.sync({ alter: true });
        // await OrderItems.sync({ alter: true });
        console.log('✅ Database tables synchronized successfully.');

        return sequelize;
      } catch (error) {
        console.error('❌ Unable to connect to the database:', error.message);
        // You might want to throw the error to prevent the app from starting with a broken DB connection
        throw error;
      }
    },
  },
];

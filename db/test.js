import db from './database.js'; // Path to your database.js

async function testCreateUser() {
    try {
        // await db.sequelize.sync({ force: true }); // This will drop and recreate the tables. Use with caution in production!

        const user = await db.User.create({
            email: 'alerdo@example.com',
            password: 'hashed' // In a real application, remember to hash passwords before saving!
        });

        console.log('User created:', user.dataValues);
    } catch (error) {
        console.error('Error creating user:', error);
    } finally {
        await db.sequelize.close();
    }
}

testCreateUser();

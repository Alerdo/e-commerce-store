import passport from 'passport';
import LocalStrategy from 'passport-local';
// import db from '../db/database.js';
// const { User } = db;

import User from '../models/user.js';
import bcrypt from 'bcryptjs';





export default (app) => {

  // Initialize passport
  app.use(passport.initialize());  
  app.use(passport.session());
  
// Set method to serialize data to store in cookie
passport.serializeUser((user, done) => {
    console.log("Serializing user:", user);
    console.log("User ID being serialized:", user.id);
    done(null, user.id);
  });
  
  // Set method to deserialize data stored in cookie and attach to req.user
  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing user with ID:", id);
    try {
      const user = await User.findByPk(id); // Use Sequelize's findByPk to fetch user by primary key
      console.log("User deserialized:", user);
      done(null, user);
    } catch (err) {
      console.log("Error in deserialization:", err);
      done(err);
    }
  });
  



passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ where: { email: email } });

            console.log("Fetched user:", user);

            if (!user) {
                console.log("No user found with email:", email);
                return done(null, false, { message: 'Incorrect email.' });
            }

            
            const isMatch = await bcrypt.compare(password, user.password); //using bcrypt to hash the req.password and check it against the one saved in db
            if (!isMatch) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (err) {
            console.error("Error in passport strategy:", err);
            return done(err);
        }
    }
));

  
 

 
  return passport;

}
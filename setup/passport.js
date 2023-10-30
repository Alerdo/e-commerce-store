import passport from 'passport';
import LocalStrategy from 'passport-local';
import db from '../db/database.js';
const { User } = db;
import bcrypt from 'bcryptjs';

export default (app) => {

    console.log("Initializing passport middlewares...");

    app.use(passport.initialize());  
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        console.log("Serializing user:", user);
        console.log("User ID being serialized:", user.id);
        done(null, user.id);
    });
  
    passport.deserializeUser(async (id, done) => {
        console.log("Deserializing user with ID:", id);
        try {
            const user = await User.findByPk(id);
            if (user) {
                console.log("User deserialized:", user);
                done(null, user);
            } else {
                console.log("No user found during deserialization for ID:", id);
                done(null, false);
            }
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
            console.log(`Attempting login for email: ${email}`);
            try {
                const user = await User.findOne({ where: { email: email } });

                if (!user) {
                    console.log("No user found with email:", email);
                    return done(null, false, { message: 'Incorrect email.' });
                }

                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    console.log("Password mismatch for email:", email);
                    return done(null, false, { message: 'Incorrect password.' });
                }

                console.log("User authenticated successfully:", user);
                return done(null, user);
            } catch (err) {
                console.error("Error in passport strategy:", err);
                return done(err);
            }
        }
    ));

    console.log("Passport configurations done.");

    return passport;
}


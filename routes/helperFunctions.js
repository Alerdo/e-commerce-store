import bcrypt from 'bcryptjs';


// const SALT_ROUNDS = 12;



// const getRandomInt = (min, max) => {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   };
  
//   const randomSaltRounds = getRandomInt(10, 14);


//1- HASHING THE PASSWORD FUNCTION

const hashPassword = async (password) => {
  const saltRounds = 12;
  try {
    // Generate salt
    const salt = await bcrypt.genSalt(saltRounds);
    
    // Hash the password
    const hash = await bcrypt.hash(password, salt);
    
    // Return the hashed password
    return hash;
  } catch (err) {
    // Log the error and throw it to be caught by the calling function
    console.error("Error in password hashing:", err);
    throw new Error('Hashing failed');
  }
};


// Usage example:
// const plainTextPassword = "myPlainTextPassword";

// hashPassword(plainTextPassword)
//   .then(hashedPassword => {
//     console.log("Hashed password:", hashedPassword);
//   })
//   .catch(err => {
//     console.error("Error:", err.message);
//   });


  export default hashPassword;
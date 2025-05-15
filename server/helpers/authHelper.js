import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    // await fot the password to be hashed
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds); // make a hashed password using the input password by the user and 10 rounds of salt password added by the bcrypt function itself
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword); // compare will compare the input password after converting into hash with the hashed password stored and return true if they match or false if they don't match each other
};

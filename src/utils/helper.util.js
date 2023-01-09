import bcrypt from "bcryptjs";

export const createPassword = async (userPassword) => bcrypt.hash(userPassword, 12)
export const comparePassword = async (userPassword, givenPassword) => 
bcrypt.compare(userPassword, givenPassword)
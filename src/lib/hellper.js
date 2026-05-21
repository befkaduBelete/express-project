import bcrypt from "bcrypt";
const rounds = 10;
export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(rounds);
  console.log(salt);
  return bcrypt.hashSync(password, salt);
};

export const comparePassowrd = (plain, hashed) => {
  return bcrypt.compareSync(plain, hashed);
};

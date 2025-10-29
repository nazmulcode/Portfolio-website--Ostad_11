import jwt from "jsonwebtoken";

const encodeToken = (email, id) => {
  const payload = { email, id };
  const key = process.env.JWT_SECRET;
  const expire = process.env.JWT_EXPIRES_IN;
  return jwt.sign(payload, key, { expiresIn: expire });
};

const decodeToken = (token) => {
  try {
    const key = process.env.JWT_SECRET;
    const decode = jwt.verify(token, key);
    return decode;
  } catch (error) {
    return null;
  }
};

const authConfigs = { encodeToken, decodeToken };
export default authConfigs;

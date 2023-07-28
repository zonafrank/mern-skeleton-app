import dotenv from "dotenv";
dotenv.config();

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "jwt_secret_key",
  mongoUri: process.env.MONGODB_URI
};

export default config;

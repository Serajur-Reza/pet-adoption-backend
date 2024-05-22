import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  hashedRound: process.env.HASHED_ROUND,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  cloud_name: process.env.CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
};

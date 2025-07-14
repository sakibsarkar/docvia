import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

const {
  FRONTEND_BASE_URL,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  NODE_ENV,
  DB_URL,
  PORT,
  PASSWORD_RECOVERY_SECRET,GEMINI_API_KEY
} = process.env;
export default {
  database_url: DB_URL,
  port: PORT,
  NODE_ENV: NODE_ENV,
  REFRESH_TOKEN: {
    SECRET: REFRESH_TOKEN_SECRET,
    EXPIRY: "7d",
  },
  ACCESS_TOKEN: {
    SECRET: ACCESS_TOKEN_SECRET,
    EXPIRY: "1h",
  },
  RECOVERY_TOKEN: {
    SECRET: PASSWORD_RECOVERY_SECRET,
    EXPIRY: "5m",
  },GEMINI_API_KEY,
  frontend_base_url: NODE_ENV === "development" ? "http://localhost:3000" : FRONTEND_BASE_URL,
};

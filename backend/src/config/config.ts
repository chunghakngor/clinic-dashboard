import dotenv from "dotenv";
dotenv.config();

const SERVER_HOSTNAME: string = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT: number = Number(String(process.env.SERVER_PORT)) || 4000;
const MONGODB_CONNECTION: string | string = process.env.MONGODB_CONNECTION || "mongodb://localhost:27017/clinic";
const SECRET: string | string = process.env.SECRET || "i5hQ62qn7#6UcaioO*bU%^";

export default {
  server: {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
  },
  db: {
    url: MONGODB_CONNECTION,
  },
  bcrypt: {
    secret: SECRET,
  },
};

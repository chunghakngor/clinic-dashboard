import dotenv from "dotenv";
dotenv.config();

const SERVER_HOSTNAME: string = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT: number = 4000;
const MONGODB_CONNECTION: string | undefined = process.env.MONGODB_CONNECTION;
const SECRET: string | undefined = process.env.SECRET;

export default {
  server: {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT,
  },
  db: {
    url: MONGODB_CONNECTION,
  },
  bcrpt: {
    secret: SECRET,
  },
};

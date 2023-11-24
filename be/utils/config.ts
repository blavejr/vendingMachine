import "dotenv/config";

const validateEnvVariables = () => {
  if (!process.env.PORT) {
    throw new Error("PORT is required in the environment variables.");
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required in the environment variables.");
  }

  if (!process.env.FE_URL) {
    throw new Error("FE_URL is required in the environment variables.");
  }
};

const config = {
  serverPort: parseInt(process.env.PORT!, 10) || 3001,
  mongodbUri: process.env.MONGODB_URI!,
  feUrl: process.env.FE_URL!,
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN!,
  },
} as const;

validateEnvVariables();

export default config;

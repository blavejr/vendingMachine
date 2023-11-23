import "dotenv/config";

const validateEnvVariables = () => {
  if (!process.env.PORT) {
    throw new Error("PORT is required in the environment variables.");
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is required in the environment variables.");
  }
};

const config = {
  serverPort: parseInt(process.env.PORT!, 10) || 3001,
  mongodbUri: process.env.MONGODB_URI!,
} as const;

validateEnvVariables();

export default config;

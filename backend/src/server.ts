import { createApp } from "./app";
import { connectDatabase } from "./config/database";
import { env } from "./config/env";

const startServer = async () => {
  await connectDatabase();
  const app = createApp();

  app.listen(env.port, () => {
    console.log(`API running on port ${env.port}`);
    console.log(`Swagger docs available at http://localhost:${env.port}/api/docs`);
  });
};

startServer().catch((error) => {
  console.error("Unable to start server", error);
  process.exit(1);
});

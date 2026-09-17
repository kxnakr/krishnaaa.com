import { migrate } from "drizzle-orm/neon-http/migrator";
import { getDb } from "@/db";

const main = async () => {
  try {
    await migrate(getDb(), {
      migrationsFolder: "src/db/migrations",
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();

import { createId } from "@paralleldrive/cuid2";
import { config } from "dotenv";
import { getDb } from "./index";
import { snippetsTable } from "./schema";

config({ path: ".env.local" });

interface SnippetInput {
  title: string;
  description: string;
  code: string;
  language: string;
  filename: string;
}

async function addSnippet(snippet: SnippetInput) {
  const slug = snippet.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  try {
    await getDb()
      .insert(snippetsTable)
      .values({
        ...snippet,
        slug,
        id: createId(),
      });
    console.log("Snippet added successfully!");
  } catch (error) {
    console.error("Error adding snippet:", error);
  }
  process.exit(0);
}

if (require.main === module) {
  const exampleSnippet = {
    title: "",
    description: "",
    code: ``,
    language: "",
    filename: "",
  };

  addSnippet(exampleSnippet);
}

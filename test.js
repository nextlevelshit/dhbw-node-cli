import {promises as fs} from "fs";
import {generateMarkdown} from "./index.js";
import path from "path";

generateMarkdown().then(async (markdown) => {
    const __dirname = path.dirname(new URL(import.meta.url).pathname); // Get current directory
    const outputDir = path.join(__dirname, 'markdown');
    const file = await fs.readFile(path.join(outputDir, "blog-post.md"));

    if (!!file) {
        process.exit(0);
    } else {
        process.exit(1);
    }
}).catch(() => {
    process.exit(1);
});
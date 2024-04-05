import path from 'path';
import {promises as fs} from "fs";

const args = process.argv.slice(2);

const __dirname = path.dirname(new URL(import.meta.url).pathname); // Get current directory

const outputDir = (folder) => path.join(__dirname, folder);

const makeFolder = async (folder) => {
    const outDir = outputDir(folder);
    await fs.mkdir(outDir, { recursive: true });     // mkdir -p posts
    return outDir;
}

const generateMarkdown = async () => {
    console.log('Generating markdown...');
    const dir = await makeFolder("markdown");
    const content = `
# My Blog Post for DHBW

This is the content of my blog post.

# And this is another super awesome headline
`;
    const filename = "blog-post.md";
    await fs.writeFile(path.join(dir, filename), content);
}

const generateHtml = async () => {
    console.log('Generating HTML...');
    await makeFolder("html");

}

switch (args[0]) {
    case 'markdown':
        generateMarkdown().catch(console.error);
        break;
    case 'html':
        generateHtml().catch(console.error);
        break;
    default:
        console.error('Invalid command. Use "markdown" or "html"');
        break;
}

export {generateMarkdown, generateHtml};
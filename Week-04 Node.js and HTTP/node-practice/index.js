import { Command } from 'commander';
import fs from 'fs/promises';
import path from 'path';

const program = new Command();

program
  .name('counter')
  .description('CLI to count words or letters in a file')
  .version('1.0.0');

// Word counter command
program
  .command('word-counter')
  .argument('<filePath>', 'Path to the file')
  .description('Count the number of words in a file')
  .action(async (filePath) => {
    try {
      const absolutePath = path.resolve(filePath);
      const data = await fs.readFile(absolutePath, 'utf8');
      const words = data.trim().split(/\s+/).filter(Boolean);
      console.log(`You have ${words.length} words in this file`);
    } catch (err) {
      console.error(`Error: Unable to read file at ${filePath}`);
      console.error(err.message);
      process.exit(1);
    }
  });

// Letter counter command
program
  .command('letter-counter')
  .argument('<filePath>', 'Path to the file')
  .description('Count the number of letters in a file (ignores spaces)')
  .action(async (filePath) => {
    try {
      const absolutePath = path.resolve(filePath);
      const data = await fs.readFile(absolutePath, 'utf8');
      const letters = data.replace(/\s+/g, ''); // Remove all spaces/newlines/tabs
      console.log(`You have ${letters.length} letters in this file`);
    } catch (err) {
      console.error(`Error: Unable to read file at ${filePath}`);
      console.error(err.message);
      process.exit(1);
    }
  });

program.parse();

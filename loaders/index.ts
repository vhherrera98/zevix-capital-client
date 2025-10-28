// simulate-next-build.ts
import chalk from "chalk"; // para color en consola (npm i chalk)
// import logSymbols from "log-symbols"; // (npm i log-symbols)

const total = 100;
let progress = 0;

// Spinner frames estilo Next.js build
const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
let spinnerIndex = 0;

function renderLoader(progress: number, frame: string) {
 const width = 30;
 const filled = Math.round((progress / total) * width);
 const empty = width - filled;
 const bar = chalk.cyan("█".repeat(filled)) + chalk.gray("░".repeat(empty));
 process.stdout.write(`\r${frame} ${chalk.bold("Creating an optimized production build...")} ${bar} ${progress}%`);
}

// limpiar consola e iniciar
console.clear();
console.log(chalk.bold("info  -") + " Loaded env from " + chalk.cyan(".env.local"));
console.log(chalk.bold("info  -") + " Using webpack 5. Reason: Enabled by default\n");

const interval = setInterval(() => {
 spinnerIndex = (spinnerIndex + 1) % spinnerFrames.length;
 const frame = spinnerFrames[spinnerIndex];

 if (progress >= 95) {
  clearInterval(interval);
  renderLoader(95, frame);
  setTimeout(() => {
   // console.log("\n\n" + logSymbols.default.success + chalk.green(" Compiled successfully."));
   // console.log("✨  " + chalk.gray("You can now view your app in the browser."));
   // console.log(chalk.gray("\nPress Enter or Ctrl+C to exit..."));
   process.stdin.resume();
  }, 500);
  return;
 }

 progress += Math.random() * 5; // simula progreso irregular
 if (progress > 95) progress = 95;
 renderLoader(Math.floor(progress), frame);
}, 120);

import { clearLastLine, log } from "@ooic/core";

let ids: any = {};

const asyncSeed = async () => {
  log("\n\n\x1B[36mDB > seeding started.\x1B[0m ");

  clearLastLine()
  log("\x1B[32mDB > Seeded successfully.\x1B[0m ");
};

export default asyncSeed;

 
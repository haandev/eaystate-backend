const { Command } = require("commander");
const program = new Command();
const fs = require("fs-extra");
const path = require("path");
const { plural } = require("pluralize");

const replacer = (file, options) => {
  let str = fs.readFileSync(file, {encoding:'utf8', flag:'r'});
  Object.entries(options).forEach(([key, value]) => {
    console.log(str)
    str = str.replace("{{{" + key + "}}}", value);
  });
  fs.writeFileSync(file, str);
};

const folderScanForFiles = (folder, callback) => {
  const items = fs.readdirSync(folder, {
    withFileTypes: true,
  });
  items.forEach((item) => {
    if (item.isFile()) {
      const itemPath = folder + "/" + item.name;
      callback(itemPath);
    } else {
      folderScanForFiles(folder + "/" + item.name,callback);
    }
  });
};

program
  .name('@ooic/servant')
  .description('CLI to utilize @ooic backend boot')
  .version('1.0.0');

program
  .command("create:crud")
  .argument("<string>", "name for handler and route")
  .option("-p, --plural <string>")
  .option("-m, --model <string>")
  .action((str, options) => {
    console.log(str,options)
    options.singular||=str
    options.plural||=plural(str)
    
    fs.copySync(
      path.resolve(__dirname, "./templates/crud-handler-group"),
      path.resolve(__dirname, "./../../../src/handlers/" + str)
    );

    folderScanForFiles(
      path.resolve(__dirname, "./../../../src/handlers/" + str),
      (itemPath) => replacer(itemPath, options)
    );
  });

  program.parse()
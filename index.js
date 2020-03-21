const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");
const core = require("@actions/core");

const inputFiles = core.getInput("files", { required: true });
const filename = core.getInput("filename");

const files = inputFiles
  .split(" ")
  .map(file => path.join(process.env.GITHUB_WORKSPACE, file));

console.log(`Ready to zip "${inputFiles}" into ${filename}`);

const zip = new AdmZip();

console.log(files);

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`  - ${file} (Not Found)`);
    return;
  }

  const dir = path.dirname(file);
  const stats = fs.lstatSync(file);

  if (stats.isDirectory()) {
    zip.addLocalFolder(file, dir);
  } else {
    zip.addLocalFile(file, dir === "." ? "" : dir);
  }

  console.log(`  - ${file}`);
});

zip.writeZip(filename);

console.log(`\nZipped file ${filename}`);

core.setOutput(filename);

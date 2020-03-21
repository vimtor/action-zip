const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");
const core = require("@actions/core");

const files = core
  .getInput("files", { required: true })
  .split(" ")
  .map(file => path.join(process.env.GITHUB_WORKSPACE, file));

const output = path.join(process.env.GITHUB_WORKSPACE, core.getInput("output"));

console.log(`Ready to zip "${files}" into ${output}`);

const zip = new AdmZip();

files.forEach(file => {
  const filename = file.replace(process.env.GITHUB_WORKSPACE, "");

  if (!fs.existsSync(filename)) {
    console.log(`  - ${filename} (Not Found)`);
    return;
  }

  const dir = path.dirname(filename);
  const stats = fs.lstatSync(filename);

  if (stats.isDirectory()) {
    zip.addLocalFolder(filename, dir);
  } else {
    zip.addLocalFile(filename, dir === "." ? "" : dir);
  }

  console.log(`  - ${filename}`);
});

zip.writeZip(output);

console.log(`\nZipped file ${output}`);

core.setOutput(output);

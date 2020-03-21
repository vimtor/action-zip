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
  const filename = file.replace(`${process.env.GITHUB_WORKSPACE}/`, "");

  if (!fs.existsSync(file)) {
    console.log(`  - ${filename} (Not Found)`);
    return;
  }

  const dir = path.dirname(filename);
  const stats = fs.lstatSync(file);

  if (stats.isDirectory()) {
    zip.addLocalFolder(file, dir);
  } else {
    zip.addLocalFile(file, dir === "." ? "" : dir);
  }

  console.log(`  - ${filename}`);
});

zip.writeZip(output);

console.log(`\nZipped file ${output}`);

core.setOutput(output);

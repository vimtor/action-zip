const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");
const core = require("@actions/core");

const files = core.getInput("files");
const dest = core.getInput("dest");

console.log(`Ready to zip "${files}" into ${dest}`);

const zip = new AdmZip();

files.split(" ").forEach(fileName => {
  const filePath = path.join(process.env.GITHUB_WORKSPACE, fileName);

  if (!fs.existsSync(filePath)) {
    console.log(`  - ${fileName} (Not Found)`);
    return;
  }

  const dir = path.dirname(fileName);
  const stats = fs.lstatSync(filePath);

  console.log(`filePath: ${filePath}`);
  console.log(`fileName: ${fileName}`);
  console.log(`dir: ${dir}`);
  console.log(`Is dir: ${stats.isDirectory()}`);

  if (stats.isDirectory()) {
    zip.addLocalFolder(filePath, dir === "." ? fileName : dir);
  } else {
    zip.addLocalFile(filePath, dir === "." ? "" : dir);
  }

  console.log(`  - ${fileName}`);
});

const destPath = path.join(process.env.GITHUB_WORKSPACE, dest);

zip.writeZip(destPath);

console.log(`\nZipped file ${dest} successfully`);

core.setOutput(destPath);

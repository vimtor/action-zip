# action-zip

> Action for zipping files easily

## Usage

The only requirement is to use the official `actions/checkout@v2` first so the zip action has access to the repo files.

```yaml
name: Zip Files

on:
  release:
    types: [published]

jobs:
  zip-files:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: papeloto/action-zip@v1
        with:
          files: dist/ manifest.json
          dest: result.zip
```

In this example, after a release is published, a new file named `result.zip` will be created with both the file `manifest.json` and the folder `dist` (files included).

## Inputs

#### `files`

Files or directories to zip.

- **Required:** Yes

#### `dest`

Name of the output zip file.

- **Required:** No
- **Default:** result.zip

#### `recursive`

Whether to add subdirectories to simply zip all files to the root.

- **Required:** No
- **Default:** true

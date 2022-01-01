# action-zip

Action for zipping files and folders easily

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
      - uses: vimtor/action-zip@v1
        with:
          files: dist/ manifest.json
          dest: result.zip
```

In this example, after a release is published, a new file named `result.zip` will be created with both the file `manifest.json` and the folder `dist` (files included).

## Inputs

#### `files`

Files or directories to zip, relative to GITHUB_WORKSPACE environmental variable.

- **Required:** Yes

#### `dest`

Name of the output zip file.

- **Required:** No
- **Default:** result.zip

#### `recursive`

Whether to add subdirectories to simply zip all files to the root.

- **Required:** No
- **Default:** true

If for example, you do the following:

```yaml
- uses: vimtor/action-zip@v1
  with:
    files: dist/ manifest.json
    recursive: false
    dest: result.zip
```

All the files inside the `dist` folder will be added at the root of the zip along with `manifest.json`. By contrast, if `recursive: true` (by default), the folder `dist` is included.

Also if you want a nested file at the root, `recursive: false` is your guy.

## Troubleshooting

If you want to check that the output is the desired one I recommend you to add the following step after zipping. You will be able to download the `result.zip` file.

```yaml
- uses: actions/upload-artifact@v1
  with:
    name: my-artifact
    path: ${{ github.workspace }}/result.zip
```

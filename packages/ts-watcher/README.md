# `@amantiks/ts-watcher`

## Purpose

`tsc --watch` has a fatal flaw - it does not clean up build files when the source files are deleted. This tool will run `tsc --watch` but ensure build files are cleaned up correctly.

## Description

Uses `chokidar` to watch all files listed in the `include` array in the tsconfig file. When a `.ts` file is unlinked, it will attempt to unlink the associated files.

**Options**

-p, --project <project> : Path to the tsconfig.json file. Defaults to `tsconfig.json`

All options after `--` are forwared to the `tsc --watch` commnand

## Usage

```
const tsWatcher = require('@amantiks/ts-watcher');

// TODO: DEMONSTRATE API
```

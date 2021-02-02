# `@amantiks/local-development`

## Purpose

There is some difficulty in developing a NodeJS application where local dependencies are involved. If those local dependencies share any dependencies (whether remote or local) then there is the chance of requiring those files in duplicate. This means Node will load different instances of the same symbols and class definitions (for example) which will break comparison across these packages.

## Description

- Specify packages that should be linked to local filesystem using config file (.links.json)
- Run `npx @amantiks/local-development`
- Links all declared and downloaded dependencies by name across all local packages

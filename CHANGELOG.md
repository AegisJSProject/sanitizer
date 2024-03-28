# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Add `*.cjs` versions of all modules

### Removed
- Do no generate `*.mjs` scripts
- Remove parsers (moved to `@aegisjsproject/parsers`)

### [v0.0.6] - 2024-03-28

### Fixed
- Do not ignore `*.min.*` & `*.map` when publishing

## [v0.0.5] - 2024-03-27

### Added
- Add `parsers` with tagged template functions for html, css, svg, etc
- Add generated minified polyfill iife script

## [v0.0.4] - 2024-03-27

### Fixed
- Use `aegis-sanitizer#html` policy on content given to `parser.parseFromString()`

## [v0.0.3] - 2024-03-27

### Added
- Add temporary support for deprecated `Sanitizer` objects in config

### Fixed
- Fix `setHTML()` using `append()` instead of `replaceChildren()`

## [v0.0.2] - 2024-03-26

### Fixed
- Make all dependencies dev dependencies

## [v0.0.1] - 2024-03-26

Initial Release

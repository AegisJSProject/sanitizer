# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v0.0.10] - 2024-04-03

### Added
- Add `dataAttributes` to control allowing of `data-*` attributes
- Add module for Sanitizer + TrustedTypes policy

### Changed
- Update SVG config to allow `<use>` & `xlink:href`, etc
- Use `trustedTypes.getAttributeType()` if available when sanitizing attributes

## [v0.0.9] - 2024-04-02

### Added
- Add polyfills for `URL.parse` & `Promise.withResolvers`

### Fixed
- Fix polyfill for `Object.groupBy`

## [v0.0.8] - 2024-04-01

### Added
- Add `@aegisjsproject/trusted-types` as dev dependency

### Fixed
- Fix indexing issue iterating over child nodes and attributes

## [v0.0.7] - 2024-03-28

### Added
- Add `*.cjs` versions of all modules
- Add `*.min.js` versions of config files

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

<!-- markdownlint-disable -->
# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v0.2.3] - 2025-12-16

### Fixed
- Make `height` & `width` allowed global attributes

## [v0.2.2] - 2025-12-16

### Changed
- Update npm publishing

### Fixed
- Do not allow `<use>`

## [v0.2.1] - 2025-11-18

### Fixed
- Remove duplicated global attributes when merging for various policies

## [v0.2.0] - 2025-10-23

### Changed
- Update to match the updated spec & Firefox Nightly implementation

## [v0.1.4] - 2025-09-28

### Changed
- Allow `command` and `commandfor` attributes

## [v0.1.3] - 2024-11-06

### Changed
- Use `setHTMLUnsafe()` instead of `innerHTML` (supports declarative Shadow DOM)
- Allow `shadowrootclonable` and `shadowrootserializable` in default HTML attribute list
- Improve `trust-policy.js` module policy creation

### Fixed
- Fix `main` and `module`

## [v0.1.2] - 2024-09-25

### Fixed
- Fix bad passing of sanitizer options and possible infinite recursion

## [v0.1.1] - 2024-09-19

### Changed
- Update dependencies and config

## [v0.1.0] - 2024-04-08

### Added
- Add `setHTML` method on `DocumentFragment` (and therefore `ShadowRoot`)
- Add support for setting config directly instead of via `sanitizer` property

### Changed
- `html`, `svg`, and `mathml` policies now default to `comments = true` (`base` has `comments = false`)

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

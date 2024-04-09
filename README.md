# `@aegisjsproject/sanitizer`

[Sanitizer API](https://github.com/WICG/sanitizer-api/) polyfill & config

[![CodeQL](https://github.com/AegisJSProject/sanitizer/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/AegisJSProject/sanitizer/actions/workflows/codeql-analysis.yml)
![Node CI](https://github.com/AegisJSProject/sanitizer/workflows/Node%20CI/badge.svg)
![Lint Code Base](https://github.com/AegisJSProject/sanitizer/workflows/Lint%20Code%20Base/badge.svg)

[![GitHub license](https://img.shields.io/github/license/AegisJSProject/sanitizer.svg)](https://github.com/AegisJSProject/sanitizer/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/AegisJSProject/sanitizer.svg)](https://github.com/AegisJSProject/sanitizer/commits/master)
[![GitHub release](https://img.shields.io/github/release/AegisJSProject/sanitizer?logo=github)](https://github.com/AegisJSProject/sanitizer/releases)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/shgysk8zer0?logo=github)](https://github.com/sponsors/shgysk8zer0)

[![npm](https://img.shields.io/npm/v/@aegisjsproject/sanitizer)](https://www.npmjs.com/package/@aegisjsproject/sanitizer)
![node-current](https://img.shields.io/node/v/@aegisjsproject/sanitizer)
![npm bundle size gzipped](https://img.shields.io/bundlephobia/minzip/@aegisjsproject/sanitizer)
[![npm](https://img.shields.io/npm/dw/@aegisjsproject/sanitizer?logo=npm)](https://www.npmjs.com/package/@aegisjsproject/sanitizer)

[![GitHub followers](https://img.shields.io/github/followers/shgysk8zer0.svg?style=social)](https://github.com/shgysk8zer0)
![GitHub forks](https://img.shields.io/github/forks/AegisJSProject/sanitizer.svg?style=social)
![GitHub stars](https://img.shields.io/github/stars/AegisJSProject/sanitizer.svg?style=social)
[![Twitter Follow](https://img.shields.io/twitter/follow/shgysk8zer0.svg?style=social)](https://twitter.com/shgysk8zer0)

[![Donate using Liberapay](https://img.shields.io/liberapay/receives/shgysk8zer0.svg?logo=liberapay)](https://liberapay.com/shgysk8zer0/donate "Donate using Liberapay")
- - -

- [Code of Conduct](./.github/CODE_OF_CONDUCT.md)
- [Contributing](./.github/CONTRIBUTING.md)
<!-- - [Security Policy](./.github/SECURITY.md) -->

## AegisJSProject Sanitizer

This is a library & polyfill for the [Sanitizer API](https://github.com/WICG/sanitizer-api/).

It provides a minimal polyfill for `Element.prototype.setHTML()` & `Document.parseHTML()`,
as well as config files for HTML, SVG, & MathML. Please note, however, that the
default sanitizer config in these sanitizer methods *only* support HTML by default.

The "base" config (not what is used by default) *DOES* add support for `<svg>`,
and the "complete" config supports `<svg>` & `<math>`.

This helps prevent XSS via:
- Stripping event attributes such as `onclick`
- Removing unsafe URL attributes such a `<a href="javascript:...">`
- Prevents adding `<script>`s and `<style>`s
- Removes other potentially dangerous elements & attributes

### Example

```js
import '@aegijsproject/sanitizer/polyfill.js';
import { sanitizer } from '@aegisjsproject/sanitizer/config/base.js';

document.body.setHTML(`
  <header id="header">
    <h1 onclick="alert(location.href)" data-foo="bar">Hello, World!</h1>
  </header>
  <nav id="nav" class="flex row">
    <button type="button" popovertarget="bacon" popovertargetaction="show" accesskey="b">Show Bacon Ipsum</button>
    <a href="#foo">Normal Link</a>
    <a href="javascript:alert('javascript:')"><code>javascript:</code> Link</a>
    <a href="data:text/plain,Not%20Allowed" target="_blank"><code>data:</code> Link</a>
    <a href="${URL.createObjectURL(file)}" target="_blank"><code>blob:</code> Link</a>
  </nav>
  <main id="main"></main>
  <div popover="auto" id="bacon">
    <div>
      <b>Bacon Ipsum</b>
      <button type="button" popovertarget="bacon" popovertargetaction="hide">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="currentColor" role="presentation" aria-label="Close Popover">
          <path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"/>
        </svg>
      </button>
    </div>
    <p>Bacon ipsum dolor amet pork belly frankfurter drumstick jowl brisket capicola short ribs. Cow chislic ham hock t-bone shoulder salami rump corned beef spare ribs prosciutto bresaola picanha drumstick. Swine tail pork belly ribeye beef kielbasa. Beef cupim ball tip pastrami spare ribs strip steak tongue salami venison. Venison cupim meatball strip steak meatloaf prosciutto buffalo frankfurter hamburger flank boudin.</p>
  </div>
`, sanitizer);
```

### Restricting Allowed Content (eg for comments)

```js
const sanitizer = {
  elements: ['span', 'div', 'p', 'code', 'pre', 'blockquote', 'img', 'a'],
  attributes: ['href', 'src', 'loading', 'height', 'width', 'class', 'alt', 'target'],
};

fetch('https://api.example.com/comments')
  .then(resp => resp.json())
  .then(comments => {
    document.querySelector('.comments').append(...comments.map(comment => {
      const el = document.createElement('div');
      el.setHTML(comment.body, sanitizer);
      return el;
    }));
  });
```

### Adding to allowed elements / attributes:

```js
import { elements, attributes } from '@aegisjsproject/sanitizer/config/html.js';

const sanitizer = {
  elements: ['hello-world', ...elements],
  attributes: ['foo', ...attributes],
};

document.querySelector('.container').setHTML(`
  <hello-world foo="bar"></hello-world>
`, sanitizer);
```

### Enforce Sanitization by default (on eg `innerHTML`, where supported)

```
if ('trustedTypes' in globalThis) {
  trustedTypes.createPolicy('default', {
    createHTML(input) {
      const el = document.createElement('div');
      el.setHTML(input);
      return el.innerHTML;
    }
  });
}
```

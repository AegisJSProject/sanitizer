import '@aegisjsproject/trusted-types';
import '@aegisjsproject/sanitizer';
import { policy } from '@aegisjsproject/sanitizer/trust-policy.js';
import { sanitizer } from '@aegisjsproject/sanitizer/config/complete.js';

const params = new URLSearchParams(location.search);

const file = new File(['Thanks for downloading my file :)'], 'thanks.txt', { type: 'text/plain' });

Promise.all([
	new CSSStyleSheet().replace(`:root {
		font-family: system-ui;
	}

	#nav {
		display: flex;
		gap: 0.8em;
	}

	a[href], button {
		cursor: pointer;
	}`),
]).then(sheets => document.adoptedStyleSheets = sheets);

const attackURL = new URL(location.pathname, location.origin);
attackURL.searchParams.set('html', `<p>Trying to inject encoded script:</p>
<img src="icon.svg" alt="Onload attack" onload="alert('XSS')" />
<img src="icon.svg
	onload=alert('XSS!')" alt="Encoded onerror with null byte">
<a href="javascript:alert('XSS!')">Click me (should be stripped)</a>
<a href="javascript:alert('XSS!')">Click me (encoded javascript URL)</a>
<a href="&#٣;avascript:alert('XSS!')">Click me (Arabic encoded javascript URL)</a>

<p>Testing nested event handlers:</p>
<button onclick="javascript:location.href='#' onmouseover='javascript:alert('XSS!')'>Click Me</button>
<button onclick="javascript:location.href='#' onmouseover='javascript:alert('XSS!')'>Click Me (encoded nested)</button>

<p>Testing character encoding confusion:</p>
<a href="<javascript:alert('XSS!')">Click Me (lt symbol in hex)</a>
<a href="<avascript:alert('XSS!')">Click Me (less than symbol in decimal)</a>
<a href="x�alert('XSS!')">Click Me (null byte in image source)</a>

<p>Testing self-XSS with unusual characters:</p>
<svg onload="alert('XSS!')">
	<circle cx="50" cy="50" r="40" fill="red" />
</svg>
<svg onload=alert('XSS!')>
	<circle cx="50" cy="50" r="40" fill="red" />
</svg>

<p>Testing data attributes (should be allowed based on your config):</p>

<p>Testing style injection:</p>
<button style="background-image: url('javascript:alert('XSS!')')">Style Injection</button>
<button style="background:url(javascript:alert('XSS!'))">Click Me (encoded background URL)</button>`);

// Tests Sanitizer via `trustedTypes.defaultPolicy
document.getElementById('container').innerHTML = policy.createHTML(`
	<style>
		h1::after {
			display: inline-block;
			content: " Styles allowed!";
		}
	</style>
	<header id="header">
		<h1 onclick="alert(location.href)" data-foo="bar">Hello, World!</h1>
		<svg fill="currentColor" height="64" width="64">
			<use xlink:href="./icon.svg#rect"></use>
		</svg>
	</header>
	<nav id="nav" class="flex row">
		<button type="button" popovertarget="bacon" popovertargetaction="show" accesskey="b">Show Bacon Ipsum</button>
		<button type="button" popovertarget="math" popovertargetaction="show" accesskey="p">Pythagorean theorem</button>
		<a href="#foo">Normal Link</a>
		<a href="javascript:alert('javascript:')"><code>javascript:</code> Link</a>
		<a href="file:${import.meta.url}"><code>file:</code> Link</a>
		<a href="data:text/plain,Not%20Allowed" target="_blank"><code>data:</code> Link</a>
		<a href="${URL.createObjectURL(file)}" download="${file.name}" target="_blank"><code>blob:</code> Download Link</a>
		<a href="about:config"><code>about:config</code></a>
		<a href="chrome://flags"><code>chrome://flags</code></a>
		<a href="${attackURL}">Test Sanitizer</a>
		<a href="./">Clear Test</a>
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

	<div popover="auto" id="math">
		<div>
			<b>Pythagorean theorem</b>
			<button type="button" popovertarget="math" popovertargetaction="hide">
				<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="currentColor" role="presentation" aria-label="Close Popover">
					<path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"/>
				</svg>
			</button>
		</div>
		<math>
			<mrow>
				<msup>
					<mi>a</mi>
					<mn>2</mn>
				</msup>
				<mo>+</mo>
				<msup>
					<mi>b</mi>
					<mn>2</mn>
				</msup>
				<mo>=</mo>
				<msup>
					<mi>c</mi>
					<mn>2</mn>
				</msup>
			</mrow>
		</math>
	</div>
	<div>
		<h3>Search Injected</h3>
		<div>${params.has('html') ? params.get('html') : 'No <code>?html=</code> search param given'}</div>
		<form id="attack" method="GET" action="${new URL(location.pathname, location.origin)}">
			<fieldset>
				<legend>Attack this Page</legend>
				<div>
					<label for="html">Inject HTML</label>
					<br />
					<textarea name="html" id="html" placeholder="&lt;div&gt;Inject HTML&lt;/div&gt;" rows="10" cols="50" required="">${params.has('html') ? params.get('html').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"' ,'&quot;') : ''}</textarea>
				</div>
			</fieldset>
			<div>
				<button type="submit">Attack</button>
				<button type="reset">Clear</button>
			</div>
		</form>
	</div>
	<template id="tmp">
		<h1 onclick="alert('Broken Template')">From Template</h1>
	</template>
	<div id="shadow-test"></div>
`, sanitizer);

document.getElementById('main').append(document.getElementById('tmp').content);

document.getElementById('shadow-test').setHTML(`<div>
	<template shadowrootmode="closed">
		<p part="greeting">Hello, <slot name="name">Somebody</slot>!</p>
	</template>
	<span slot="name">World</span>
</div>`);

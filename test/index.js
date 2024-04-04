import '@aegisjsproject/trusted-types';
import '@aegisjsproject/sanitizer';
import '@aegisjsproject/sanitizer/trust-policy.js?policy=default';
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

document.getElementById('container').innerHTML = trustedTypes.defaultPolicy.createHTML(`
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
		<a href="?html=%3Cp%3ETrying+to+inject+encoded+script%3A%3C%2Fp%3E%0A++%3Cimg+src%3D%22notanimage.jpg%250Aonerror%3Dalert%28%27XSS%21%27%29%22+alt%3D%22Encoded+onerror%22%3E%0A++%3Cimg+src%3D%22notanotherimage.png%0Aonerror%3Dalert%28%27XSS%21%27%29%22+alt%3D%22Encoded+onerror+with+null+byte%22%3E%0A++%3Ca+href%3D%22javascript%3Aalert%28%27XSS%21%27%29%22%3EClick+me+%28should+be+stripped%29%3C%2Fa%3E%0A++%3Ca+href%3D%22javascript%3Aalert%28%27XSS%21%27%29%22%3EClick+me+%28encoded+javascript+URL%29%3C%2Fa%3E%0A++%3Ca+href%3D%22%26%23%D9%A3%3Bavascript%3Aalert%28%27XSS%21%27%29%22%3EClick+me+%28Arabic+encoded+javascript+URL%29%3C%2Fa%3E%0A%0A%3Cp%3ETesting+nested+event+handlers%3A%3C%2Fp%3E%0A++%3Cbutton+onclick%3D%22javascript%3Alocation.href%3D%27%23%27+onmouseover%3D%27javascript%3Aalert%28%27XSS%21%27%29%27%3EClick+Me%3C%2Fbutton%3E%0A++%3Cbutton+onclick%3D%22javascript%3Alocation.href%3D%27%23%27+onmouseover%3D%27javascript%3Aalert%28%27XSS%21%27%29%27%3EClick+Me+%28encoded+nested%29%3C%2Fbutton%3E%0A%0A%3Cp%3ETesting+character+encoding+confusion%3A%3C%2Fp%3E%0A++%3Ca+href%3D%22%3Cjavascript%3Aalert%28%27XSS%21%27%29%22%3EClick+Me+%28lt+symbol+in+hex%29%3C%2Fa%3E%0A++%3Ca+href%3D%22%3Cavascript%3Aalert%28%27XSS%21%27%29%22%3EClick+Me+%28less+than+symbol+in+decimal%29%3C%2Fa%3E%0A++%3Ca+href%3D%22x%00alert%28%27XSS%21%27%29%22%3EClick+Me+%28null+byte+in+image+source%29%3C%2Fa%3E%0A++%3Cimg+src%3D%22x%EF%BF%BDalert%28%27XSS%21%27%29%22+alt%3D%22Image+with+null+byte%22%3E%0A%0A%3Cp%3ETesting+self-XSS+with+unusual+characters%3A%3C%2Fp%3E%0A++%3Cimg+src%3D%22notanimage.jpg%00alert%28%27XSS%21%27%29%22+alt%3D%22Image+with+null+byte%22%3E%0A++%3Cimg+src%3D%22notanotherimage.png%01%22+alt%3D%22Image+with+strange+character%22%3E%0A++%3Csvg+onload%3D%22alert%28%27XSS%21%27%29%22%3E%0A++++%3Ccircle+cx%3D%2250%22+cy%3D%2250%22+r%3D%2240%22+fill%3D%22red%22+%2F%3E%0A++%3C%2Fsvg%3E%0A++%3Csvg+onload%3Dalert%28%27XSS%21%27%29%3E%0A++++%3Ccircle+cx%3D%2250%22+cy%3D%2250%22+r%3D%2240%22+fill%3D%22red%22+%2F%3E%0A++%3C%2Fsvg%3E%0A%0A%3Cp%3ETesting+data+attributes+%28should+be+allowed+based+on+your+config%29%3A%3C%2Fp%3E%0A++%3Cdiv+data-harmless%3D%22true%22%3EThis+is+a+harmless+data+attribute%3C%2Fdiv%3E%0A++%3Cdiv+data-evil%3D%22true%22+style%3D%22color%3A+red%3B%22%3EThis+is+an+evil+data+attribute+%28color+might+be+stripped%29%3C%2Fdiv%3E%0A%0A%3Cp%3ETesting+style+injection%3A%3C%2Fp%3E%0A++%3Cbutton+style%3D%22background-image%3A+url%28%27javascript%3Aalert%28%27XSS%21%27%29%27%29%22%3EClick+Me%3C%2Fbutton%3E%0A++%3Cbutton+style%3D%22background%3Aurl%28javascript%3Aalert%28%27XSS%21%27%29%29%22%3EClick+Me+%28encoded+background+URL%29%3C%2Fbutton%3E">Test Sanitizer</a>
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
		<form id="attack" method="GET" action="${location.href}">
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
`, sanitizer);

document.getElementById('main').append(document.getElementById('tmp').content);

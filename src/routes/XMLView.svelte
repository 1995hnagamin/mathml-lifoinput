<script lang="ts">
	import type { Elem } from '$lib/node';
	import { stringify } from '$lib/node';
	export let elem: Elem | null = null;

	let text = '';
	$: text = elem != null ? stringify(elem) : '';

	let afterCopied = false;

	function copy() {
		navigator.clipboard.writeText(text).then(
			() => {
				afterCopied = true;
				setTimeout(() => (afterCopied = false), 1000);
			},
			(err) => {
				console.error(err);
			}
		);
	}
</script>

<div class="xml-view">
	<pre>{text}</pre>
	<button class="copy" on:click={copy}>{afterCopied ? 'copied!' : 'copy to clipboard'}</button>
</div>

<style>
	div.xml-view {
		white-space: pre-wrap;
		font-family: monospace;
	}
	pre {
		padding: 10px;
	}
	button.copy {
		position: fixed;
		top: 10px;
		right: 10px;
	}
</style>

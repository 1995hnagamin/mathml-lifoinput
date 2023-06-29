<script lang="ts">
	import type { Elem } from '$lib/node';
	import { stringify } from '$lib/node';
	export let elem: Elem | null = null;
</script>

<div class="xml-view">
	<pre>{elem != null ? stringify(elem) : ''}</pre>
</div>

<style>
	div.xml-view {
		white-space: pre-wrap;
		font-family: monospace;
	}
</style>

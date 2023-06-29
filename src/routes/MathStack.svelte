<script lang="ts">
	import MathML from './MathML.svelte';
	import type { Stack } from '$lib/env';
	export let items: Stack;
</script>

<ul>
	{#each items as item (item.id)}
		<li>
			<math><MathML elem={item.elem} /></math>
		</li>
	{/each}
</ul>

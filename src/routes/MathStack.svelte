<script lang="ts">
	import MathML from './MathML.svelte';
	import type { Stack } from '$lib/env';
	export let items: Stack;
</script>

<ul>
	{#each items as item (item.id)}
		<li>
			<math xmlns="http://www.w3.org/1998/Math/MathML">
				<MathML elem={item.elem} />
			</math>
		</li>
	{/each}
</ul>

<style>
	ul {
		margin-left: 8px;
		padding: 0;
	}

	ul li {
		list-style-type: none;
		border-left: medium solid #000;
		margin: 8px 8px 0 0;
		padding: 0 0 0 8px;
	}
</style>

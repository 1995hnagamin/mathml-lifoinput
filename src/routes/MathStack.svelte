<script lang="ts">
	import MathML from './MathML.svelte';
	import type { Stack } from '$lib/env';
	export let items: Stack;
</script>

<ul>
	{#each items as item (item.id)}
		<li>
			<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">
				<MathML elem={item.elem} />
			</math>
		</li>
	{/each}
</ul>

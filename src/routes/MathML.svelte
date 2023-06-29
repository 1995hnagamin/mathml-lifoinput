<script lang="ts">
	import type { Elem } from '$lib/node';
	export let elem: Elem;

	let attrs = {
		display: 'block',
	};
</script>

<svelte:element this={elem.tag}>
	{#if typeof elem.content === 'string'}
		{elem.content}
	{:else}
		{#each elem.content as child}
			<svelte:self elem={child} />
		{/each}
	{/if}
</svelte:element>

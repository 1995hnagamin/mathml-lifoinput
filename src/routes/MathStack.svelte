<script lang="ts">
	import MathStackItem from './MathStackItem.svelte';
	import type { Stack } from '$lib/env';
	export let items: Stack;
</script>

<ul>
	{#each items as item (item.id)}
		<MathStackItem elem={item.elem} />
	{/each}
</ul>

<style>
	ul {
		margin-left: 8px;
		padding: 0;
	}
</style>

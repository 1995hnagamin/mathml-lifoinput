<script lang="ts">
	import type { Writable } from 'svelte/store';
	import MathStackItem from './MathStackItem.svelte';
	import type { Stack } from '$lib/env';
	export let items: Stack;
	export let activeIndex: Writable<number | null>;

	function updateActive(i: number) {
		$activeIndex = i;
	}
</script>

<ul>
	{#each items as item, i (item.id)}
		<MathStackItem elem={item.elem} updateActive={() => updateActive(i)} />
	{/each}
</ul>

<style>
	ul {
		margin-left: 8px;
		padding: 0;
	}
</style>

<script lang="ts">
	import type { Writable } from 'svelte/store';
	import MathStackItem from './MathStackItem.svelte';
	import type { Stack } from '$lib/env';
	export let items: Stack;
	export let updateEnv: (stk: Stack) => void;
	export let activeIndex: Writable<number | null>;

	function updateActive(i: number) {
		$activeIndex = i;
	}

	let dragIndex = null as number | null;

	let dragEnter = (i: number) => {
		if (dragIndex == null || i === dragIndex) {
			return;
		}
		let newItems = items.slice();
		const elem = newItems.splice(dragIndex, 1)[0];
		newItems.splice(i, 0, elem);
		items = newItems;
		dragIndex = i;
	};

	let dragEnd = () => {
		updateEnv(items);
		dragIndex = null;
	};
</script>

<ul>
	{#each items as item, i (item.id)}
		<MathStackItem
			elem={item.elem}
			updateActive={() => updateActive(i)}
			dragStart={() => (dragIndex = i)}
			dragEnter={() => dragEnter(i)}
			{dragEnd}
		/>
	{/each}
</ul>

<style>
	ul {
		margin-left: 8px;
		padding: 0;
	}
</style>

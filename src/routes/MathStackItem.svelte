<script lang="ts">
	import MathML from './MathML.svelte';
	import type { Elem } from '$lib/node';
	export let elem: Elem;
	export let updateActive: () => void;
	let hovering = false;

	function enter() {
		hovering = true;
		updateActive();
	}

	function leave() {
		hovering = false;
	}
</script>

<li on:mouseover={enter} on:focus={enter} on:mouseleave={leave} class:active={hovering}>
	<math xmlns="http://www.w3.org/1998/Math/MathML">
		<MathML {elem} />
	</math>
</li>

<style>
	li {
		list-style-type: none;
		border-left: medium solid #000;
		margin: 8px 8px 0 0;
		padding: 0 0 0 8px;
	}
	.active {
		background-color: #eee;
	}
</style>

<script lang="ts">
	import { writable } from 'svelte/store';
	import type { Elem } from '$lib/node';
	import Input from './Input.svelte';
	import MathStack from './MathStack.svelte';
	import * as Env from '$lib/env';
	import { interpret } from '$lib/interpret';
	import XmlView from './XMLView.svelte';

	let env = Env.empty();

	let activeNode = null as null | Elem;
	export const activeIndex = writable<number | null>(null);

	$: if ($activeIndex != null && $activeIndex < env.stack.length) {
		activeNode = env.stack[$activeIndex].elem;
	} else {
		activeNode = null;
	}

	const handleInput = (cmd: string) => {
		env = interpret(env, cmd);
	};
</script>

<div class="main-view">
	<div class="input-area">
		<MathStack items={env.stack} {activeIndex} />
		<Input addItem={handleInput} />
	</div>
	<div class="mathml-textarea">
		<XmlView elem={activeNode} />
	</div>
</div>

<style>
	div.main-view {
		width: 100vw;
		height: 100vh;
	}

	div.input-area {
		width: 50%;
		height: 100%;
		float: left;
	}

	div.mathml-textarea {
		background-color: #eee;
		width: 50%;
		height: 100%;
		float: right;
		overflow: auto;
	}
</style>

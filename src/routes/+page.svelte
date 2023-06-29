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

	let history = [env] as Env.Env[];
	let historyIndex = 0;
	$: historyIndex = history.length - 1;

	const handleInput = (cmd: string) => {
		env = interpret(env, cmd);
		history = history.slice(0, historyIndex + 1).concat(env);
	};

	const handleUndo = () => {
		if (historyIndex < 1) {
			return;
		}
		historyIndex = historyIndex - 1;
		$activeIndex = null;
		env = history[historyIndex];
	};

	const handleRedo = () => {
		if (historyIndex + 1 >= history.length) {
			return;
		}
		historyIndex = historyIndex + 1;
		$activeIndex = null;
		env = history[historyIndex];
	};
</script>

<div class="main-view">
	<div class="input-area">
		<button on:click={handleUndo} disabled={historyIndex < 1}>undo</button>
		<button on:click={handleRedo} disabled={historyIndex + 1 >= history.length}>redo</button>
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

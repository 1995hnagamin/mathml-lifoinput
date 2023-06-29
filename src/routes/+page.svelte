<script lang="ts">
	import Input from './Input.svelte';
	import MathStack from './MathStack.svelte';
	import * as Env from '$lib/env';
	import { interpret } from '$lib/interpret';
	import XmlView from './XMLView.svelte';

	let env = Env.empty();

	const handleInput = (cmd: string) => {
		env = interpret(env, cmd);
	};
</script>

<div class="main-view">
	<div class="input-area">
		<MathStack items={env.stack} />
		<Input addItem={handleInput} />
	</div>
	<div class="mathml-textarea">
		<XmlView />
	</div>
</div>

<style>
	div.main-view {
		height: 100%;
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

<script lang="ts">
	import Input from './Input.svelte';
	import MathStack from './MathStack.svelte';
	import * as Env from '$lib/env';
	import { interpret } from '$lib/interpret';

	let env = Env.empty();

	const handleInput = (cmd: string) => {
		env = interpret(env, cmd);
	};
</script>

<MathStack items={env.stack} />
<Input addItem={handleInput} />

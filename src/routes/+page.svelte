<script lang="ts">
	import Input from './Input.svelte';
	import MathStack from './MathStack.svelte';

	let items = ['a', 'b', 'c'];
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<MathStack {items} />
<Input addItem={(item) => (items = [...items, item])} />

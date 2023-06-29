<script lang="ts">
	export let addItem: (item: string) => void;

	let input = '';

	function handleSubmit() {
		addItem(input);
		input = '';
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<input type="text" bind:value={input} />
	<button type="submit">Submit</button>
</form>

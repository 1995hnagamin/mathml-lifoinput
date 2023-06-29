<script lang="ts">
	export let addItem: (item: string) => void;

	let input = '';

	function handleSubmit() {
		addItem(input);
		input = '';
	}
</script>

<div class="command-input-wrapper">
	<form on:submit|preventDefault={handleSubmit}>
		<input type="text" bind:value={input} />
		<button type="submit">Submit</button>
	</form>
</div>

<style>
	div.command-input-wrapper {
		position: fixed;
		width: 50%;
		bottom: 8px;
	}
	form {
		width: 100%;
		display: inline-flex;
		justify-content: center;
	}
	input {
		width: 85%;
	}
</style>

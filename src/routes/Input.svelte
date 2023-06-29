<script>
	let input = '';

	function handleSubmit() {
		alert(input);
		input = '';
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<input type="text" bind:value={input} />
	<button type="submit">Submit</button>
</form>

<script lang="ts">
	import type { Elem } from '$lib/node';
	export let elem: Elem | null = null;
</script>

<div>{elem?.tag}</div>

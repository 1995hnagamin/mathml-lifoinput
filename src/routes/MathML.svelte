<script lang="ts">
	import type { Elem } from '$lib/node';
	export let elem: Elem;
</script>

{#if elem.tag === 'mfrac'}
	<mfrac xmlns="http://www.w3.org/1998/Math/MathML" {...elem.attrs}>
		{#if typeof elem.content === 'string'}
			{elem.content}
		{:else}
			{#each elem.content as child}
				<svelte:self elem={child} />
			{/each}
		{/if}
	</mfrac>
{:else if elem.tag === 'mi'}
	<mi xmlns="http://www.w3.org/1998/Math/MathML" {...elem.attrs}>
		{#if typeof elem.content === 'string'}
			{elem.content}
		{:else}
			{#each elem.content as child}
				<svelte:self elem={child} />
			{/each}
		{/if}
	</mi>
{:else if elem.tag === 'mn'}
	<mn xmlns="http://www.w3.org/1998/Math/MathML" {...elem.attrs}>
		{#if typeof elem.content === 'string'}
			{elem.content}
		{:else}
			{#each elem.content as child}
				<svelte:self elem={child} />
			{/each}
		{/if}
	</mn>
{:else if elem.tag === 'mo'}
	<mo xmlns="http://www.w3.org/1998/Math/MathML" {...elem.attrs}>
		{#if typeof elem.content === 'string'}
			{elem.content}
		{:else}
			{#each elem.content as child}
				<svelte:self elem={child} />
			{/each}
		{/if}
	</mo>
{:else if elem.tag === 'mrow'}
	<mrow xmlns="http://www.w3.org/1998/Math/MathML" {...elem.attrs}>
		{#if typeof elem.content === 'string'}
			{elem.content}
		{:else}
			{#each elem.content as child}
				<svelte:self elem={child} />
			{/each}
		{/if}
	</mrow>
{:else if elem.tag === 'mroot'}
	<mroot xmlns="http://www.w3.org/1998/Math/MathML" {...elem.attrs}>
		{#if typeof elem.content === 'string'}
			{elem.content}
		{:else}
			{#each elem.content as child}
				<svelte:self elem={child} />
			{/each}
		{/if}
	</mroot>
{:else if elem.tag === 'msqrt'}
	<msqrt xmlns="http://www.w3.org/1998/Math/MathML" {...elem.attrs}>
		{#if typeof elem.content === 'string'}
			{elem.content}
		{:else}
			{#each elem.content as child}
				<svelte:self elem={child} />
			{/each}
		{/if}
	</msqrt>
{:else if elem.tag === 'msubsup'}
	<msubsup xmlns="http://www.w3.org/1998/Math/MathML" {...elem.attrs}>
		{#if typeof elem.content === 'string'}
			{elem.content}
		{:else}
			{#each elem.content as child}
				<svelte:self elem={child} />
			{/each}
		{/if}
	</msubsup>
{:else if elem.tag === 'mstyle'}
	<mstyle xmlns="http://www.w3.org/1998/Math/MathML" {...elem.attrs}>
		{#if typeof elem.content === 'string'}
			{elem.content}
		{:else}
			{#each elem.content as child}
				<svelte:self elem={child} />
			{/each}
		{/if}
	</mstyle>
{:else if elem.tag === 'msup'}
	<msup xmlns="http://www.w3.org/1998/Math/MathML" {...elem.attrs}>
		{#if typeof elem.content === 'string'}
			{elem.content}
		{:else}
			{#each elem.content as child}
				<svelte:self elem={child} />
			{/each}
		{/if}
	</msup>
{:else if elem.tag === 'mtable'}
	<mtable xmlns="http://www.w3.org/1998/Math/MathML" {...elem.attrs}>
		{#if typeof elem.content === 'string'}
			{elem.content}
		{:else}
			{#each elem.content as child}
				<svelte:self elem={child} />
			{/each}
		{/if}
	</mtable>
{:else if elem.tag === 'mtd'}
	<mtd xmlns="http://www.w3.org/1998/Math/MathML" {...elem.attrs}>
		{#if typeof elem.content === 'string'}
			{elem.content}
		{:else}
			{#each elem.content as child}
				<svelte:self elem={child} />
			{/each}
		{/if}
	</mtd>
{:else if elem.tag === 'mtr'}
	<mtr xmlns="http://www.w3.org/1998/Math/MathML" {...elem.attrs}>
		{#if typeof elem.content === 'string'}
			{elem.content}
		{:else}
			{#each elem.content as child}
				<svelte:self elem={child} />
			{/each}
		{/if}
	</mtr>
{:else}
	<div />
{/if}

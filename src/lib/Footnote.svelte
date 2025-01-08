<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet
	}
	let props: Props = $props();
</script>
<style>
    div {
        font-size: 0.5em;
        position: absolute;
        bottom: 0;
        right: 0;
    }
</style>

<div>{@render props.children()}</div>

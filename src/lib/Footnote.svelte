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
        bottom: 1px;
        right: 1px;
    }
</style>

<div>{@render props.children()}</div>

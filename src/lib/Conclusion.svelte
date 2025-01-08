<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet
	}
	let props: Props = $props();
</script>
<style>
    p {
        font-weight: bold;
        font-size: 1.5em;
    }
</style>

<p class="fragment">{@render props.children()}</p>
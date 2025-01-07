<script lang="ts">
	import type { Options } from 'reveal.js';
	import type { Snippet } from 'svelte';

	interface Props {
		transitionStyle?: Required<Options>['transition'] | null,
		transitionSpeed?: Required<Options>['transitionSpeed'] | null,
		autoAnimate?: boolean | null;
		autoAnimateID?: string | null;
		autoAnimateRestart?: boolean | null;
		children: Snippet;
	}

	let {
		transitionStyle = null,
		transitionSpeed = null,
		children,
		autoAnimate = null,
		autoAnimateRestart = null,
		autoAnimateID = null
	}: Props = $props();

</script>
<section data-transition="{transitionStyle}" data-transition-speed="{transitionSpeed}" data-auto-animate={autoAnimate}
				 data-auto-animate-id="{autoAnimateID}" data-auto-animate-restart={autoAnimateRestart}>
	{@render children()}
</section>
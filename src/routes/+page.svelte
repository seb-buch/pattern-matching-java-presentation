<script lang="ts">
	import 'reveal.js/dist/reveal.css';
	import '$lib/op.css';
	import '@catppuccin/highlightjs/css/catppuccin-latte.css';

	import Reveal, { type Options } from 'reveal.js';
	import RevealHighlight from 'reveal.js/plugin/highlight/highlight';
	import RevealNotes from 'reveal.js/plugin/notes/notes';
	import RevealMath from 'reveal.js/plugin/math/math';
	import { onMount, tick } from 'svelte';
	import Presentation from '../presentation/Presentation.svelte';
	import { checkSlideDimensions } from '$lib/core';

	export let reveal: Options = {
		slideNumber: false,
		showSlideNumber: 'all',
		controls: false,
		transition: 'none',
		backgroundTransition: 'none',
		hash: true,
		width: 1920,
		height: 1080,
		plugins: [RevealHighlight, RevealNotes, RevealMath.KaTeX],
		center: false
	};

	onMount(async () => {
		await tick();
		const deck = new Reveal(reveal);
		deck.on('slidechanged', checkSlideDimensions);
		deck.on('ready', checkSlideDimensions);
		await deck.initialize();
		console.log('Presentation is ready!');
	});


</script>

<div class="reveal">
	<div class="slides">
		<Presentation />
	</div>
</div>
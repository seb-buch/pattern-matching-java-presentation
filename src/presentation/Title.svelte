<script>
import Slide from '$lib/Slide.svelte';
import background from './assets/eventBackground.png';
</script>

<style>
    div {
        position: relative;
        height: 600px;
        width: calc(100% - 650px);
        margin-left: 650px;
        margin-top: 200px;
    }

    h1 {
        font-family: Poppins, sans-serif;
        font-weight: normal;
        text-transform: none;
        font-size: 80px;
        color: white;
        text-align: left;
    }

    p {
        color: var(--r-heading-color);
        text-align: left;
    }
</style>

<Slide backgroundImage="{background}">
	<div>
		<h1>Comment rendre son code Java plus expressif et robuste avec le <b>pattern matching</b></h1>
		<p>Sébastien Buchoux</p>
	</div>
</Slide>
<script>
import Slide from '$lib/Slide.svelte';
import background from './assets/eventBackground.png';
</script>

<style>
    div {
        position: relative;
        height: 600px;
        width: calc(100% - 800px);
        margin-left: 800px;
        margin-top: 300px;
        text-align: center;
    }

    h1 {
        font-family: Poppins, sans-serif;
        font-weight: normal;
        text-transform: none;
        font-size: 80px;
        color: white;
    }

    p {
        color: var(--r-heading-color);
    }

    figure {
        img {
            height: 400px;
            border: 5px solid var(--r-heading-color);
        }

        figcaption {
            color: white;
            font-size: 0.6em;
        }
    }
</style>

<Slide backgroundImage="{background}">
	<div>
		<h1>Merci !</h1>
		<p><a href="mailto:s.buchoux@groupeonepoint.com">s.buchoux@groupeonepoint.com</a></p>
		<figure>
			<img src="" alt="QRcode">
			<figcaption>Les diapos</figcaption>
		</figure>
	</div>
</Slide>
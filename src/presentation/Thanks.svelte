<script>
import Slide from '$lib/Slide.svelte';
import background from './assets/eventBackground.png';
import qrCode from './assets/qr-code-pres.svg';
import feedback from './assets/feedback.png';
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
        display: inline-block;
        padding: 0 1em;

        img {
            height: 250px;
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
			<img src="{qrCode}" alt="QRcode">
			<figcaption>La présentation</figcaption>
		</figure>
		<figure>
			<img src="{feedback}" alt="QRcodeFeedback">
			<figcaption>Le feedback</figcaption>
		</figure>
	</div>
</Slide>
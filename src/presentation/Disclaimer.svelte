<script>
import Slide from '$lib/Slide.svelte';
import good from './assets/Mona_Lisa.jpg';
import bad from './assets/Mona_Lisa-paint.png';
</script>

<style>
    div.container {
        padding-top: 2em;
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        & > div {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }


</style>

<section>
	<Slide autoAnimateRestart autoAnimate>
		<h3>Attention</h3>
		<div class="container">
			<div data-id="good">
				<img src="{good}" alt="good">
				<p>cours sur le <em>pattern matching</em></p>
			</div>
		</div>
	</Slide>
	<Slide autoAnimate>
		<h3>Attention</h3>
		<div class="container">
			<div data-id="good">
				<img src="{good}" alt="good">
				<p>cours sur le <em>pattern matching</em></p>
			</div>
			<div data-id="bad">
				<img src="{bad}" alt="bad">
				<p>cette présentation</p>
			</div>
		</div>
	</Slide>
</section>
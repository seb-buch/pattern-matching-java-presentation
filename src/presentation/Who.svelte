<script>
import Slide from '$lib/Slide.svelte';
import VerticalSpacer from '$lib/VerticalSpacer.svelte';
</script>

<style>
    .three-column {
        display: flex;
        flex-direction: row;
        justify-content: space-around;

        & > div {
            width: 30%;

            h4 {
                padding-bottom: 2em;
            }

            p {
                font-size: 0.8em;
                padding-bottom: 2em;
            }
        }
    }
</style>

<Slide>
	<h3>À propos de moi</h3>
	<VerticalSpacer height="3em" />
	<div class="three-column">
		<div>
			<h4>Qui?</h4>
			<p>
				Enseignant-chercheur reconverti en architecte/tech lead chez Onepoint
			</p>
		</div>
		<div>
			<h4>Intérêts</h4>
			<p>
				Dév /optimisation d'outils d'analyse de données scientifiques orientés HPC (efficience, calculs parallélisés,
				etc.)
			</p>
			<p>
				Avocat des pratiques Continuous Delivery:<br />
				Automatisation (tests, déploiement), TDD, qualité et maintenabilité du code…
			</p>
		</div>
		<div>
			<h4>Technos ?</h4>
			<p>
				Python, Cython, C, Typescript, HTML/CSS, Rust, Java
			</p>
		</div>
	</div>
</Slide>
<script>
import Slide from '$lib/Slide.svelte';
import VerticalSpacer from '$lib/VerticalSpacer.svelte';
</script>
<style>
    p.part {
        color: var(--r-heading-color);
        font-weight: bold;
        padding-bottom: 0;
        margin: 0;
    }

    ul {
        list-style-type: none;
        text-align: center;

        li {
            line-height: 1.5em;
        }
    }

    p.conclusion {
        font-weight: bold;
    }
</style>

<Slide autoAnimateRestart>
	<h3>Conclusion : <em>pattern matching</em> et Java</h3>
	<VerticalSpacer height="2em" />
	<p class="part">Simplicité et Lisibilité:</p>
	<ul>
		<li>Élimination des vérifications et conversions explicites</li>
		<li>Facilite la compréhension des structures conditionnelles complexes</li>
	</ul>
	<VerticalSpacer height="1.5em" />
	<div class="fragment">
		<p class="part">
			Sécurité et Robustesse:
		</p>
		<ul>
			<li>Diminue les risques liés aux erreurs de type</li>
			<li>Encourage un code plus concis et expressif</li>
			<li>Exhausitivité des branchements logiques</li>
		</ul>
	</div>

	<VerticalSpacer height="2em" />
	<p class="conclusion fragment">
		Le <em>pattern matching</em> n'est pas qu'une simplification syntaxique<br />
		C'est une évolution qui améliore la productivité et la lisibilité du code Java moderne.
	</p>
</Slide>
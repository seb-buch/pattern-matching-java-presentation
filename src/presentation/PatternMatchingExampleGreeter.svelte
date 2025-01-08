<script lang="ts">
import Slide from '$lib/Slide.svelte';
import Code from '$lib/Code.svelte';

type GreeterIO = { input: string, output: string };
let greeterIOs: GreeterIO[] = [
	{ input: 'Visiteur anonyme', output: 'Welcome guest!' }
];
</script>

{#snippet entry(greeterIO: GreeterIO)}
	<tr>
		<td>{greeterIO.input}</td>
		<td>=></td>
		<td>{greeterIO.output}</td>
	</tr>
{/snippet}

<Slide>
	<h3>Exemple d'utilisation: un <em>greeter</em></h3>
	<p>Fonction qui renvoie un message en fonction de l’état d'authentification d’un utilisateur:</p>
	<div>
		{#each greeterIOs as greeterIO}
			{@render entry(greeterIO)}
		{/each}
	</div>
</Slide>
<Slide autoAnimate="{true}">
	<h2 data-id="example-title">Du code!</h2>
	<Code language="javascript" id="example">
				<script type="text/template">
					const name = 'hello world';
					if (name === 'hello') {
						console.log('world');
					}
				</script>
			</Code>
</Slide>
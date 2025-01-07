<script lang="ts">
		import Slide from '$lib/Slide.svelte';
		import Code from '$lib/Code.svelte';
		import ObscureImpl from './ObscureImpl.svelte';
</script>

<ObscureImpl />

<Slide transitionStyle="zoom" transitionSpeed="fast">
	<h3>Coucou</h3>
	{`$$ J(\\theta_0,\\theta_1) = \\sum_{i=0} $$`}
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

<Slide autoAnimate="{true}">
	<h2 data-id="example-title">Plus de code!</h2>
	<Code language="javascript" id="example">
				<script type="text/template">
					const name = 'hello world';
					if (name === 'hello') {
						console.log('world');
						console.log('I am alive!');
					}
				</script>
			</Code>
</Slide>




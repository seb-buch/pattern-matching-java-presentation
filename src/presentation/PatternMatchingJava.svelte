<script lang="ts">
import Slide from '$lib/Slide.svelte';
import Code from '$lib/Code.svelte';
import VerticalSpacer from '$lib/VerticalSpacer.svelte';


type JavaJEP = {
	targetVersion: string,
	JEPNumber: number
}
type Feature = {
	keyword: string,
	previewJEP?: JavaJEP,
	finalJEP?: JavaJEP
}

let types:Feature[] = [
	{keyword: "enum"},
	{keyword: "record",
	previewJEP:{
		targetVersion:"19",
		JEPNumber: 405
	},
		finalJEP:{
		targetVersion:"21",
			JEPNumber: 440
		}
	},
	{
		keyword:"sealed class/interface",
		previewJEP: {
			targetVersion: "15",
			JEPNumber: 360
		},
		finalJEP:{
			targetVersion: "17",
			JEPNumber: 409
		}
	}
]

let implementations:Feature[] = [
	{keyword: "instanceof",
		previewJEP:{
		JEPNumber: 305,
			targetVersion:"14"
		},
		finalJEP:{
		targetVersion:"16",
			JEPNumber:394
		}
	},
	{keyword: "switch",
		previewJEP:{
			JEPNumber: 406,
			targetVersion:"17"
		},
		finalJEP:{
			targetVersion:"21",
			JEPNumber: 441
		}
	}
]
</script>
<style>
	.two-columns {
			display: flex;
			justify-items: left;
			align-items: center;

			&>div:first-child{
					width: 50%;
			}

			&>div:nth-child(2){
					width: 50%;
			}

			& ul {
					list-style: none;
					margin: 0;
					padding-inline-start: 0;
					text-align: center;

					li {
							padding-bottom: 1em;
							p {
									font-size: 0.75em;
									margin: 0;
									padding: 0;
              }

							p:first-child{
									font-size: 1em;
							}

					}
			}
	}
</style>

{#snippet JEPEntry(jep:JavaJEP, isPreview:Boolean=false)}
	<span>{#if isPreview}<em>Preview</em>&nbsp;:{/if} Java {jep.targetVersion} (<a href="https://openjdk.org/jeps/{jep.JEPNumber}" target="_blank">JEP {jep.JEPNumber}</a>)</span>
{/snippet}
{#snippet featureEntry(feature:Feature)}
	<p><code>{feature.keyword}</code></p>
	<p>
	{#if feature.previewJEP}
		{@render JEPEntry(feature.previewJEP, true)}
		{#if feature.finalJEP}
			<span>&ndash;</span>
		{/if}
	{/if}
	{#if feature.finalJEP}
		{@render JEPEntry(feature.finalJEP)}
	{/if}
	</p>
{/snippet}

<Slide autoAnimate>
	<h3>Le <em>Pattern Matching</em> en Java</h3>
	<div class="two-columns">
		<div>
			<p>Types utilisables:</p>
			<ul>
				{#each types as javaType}
				<li>{@render featureEntry(javaType)}</li>
				{/each}
			</ul>
		</div>
		<div>
			<Code language="java" id="example-enum">
				<script type="text/java">
					public enum WebEvent {
						PAGELOAD,
						PAGEUNLOAD,
						KEYPRESS,
						CLICK,
					}
				</script>
			</Code>
		</div>
	</div>
	<VerticalSpacer height="1em"/>
	<div class="two-columns" >
		<div>
			<p >Implémentation de pattern matching:</p>
			<ul>
				{#each implementations as implementation}
					<li>{@render featureEntry(implementation)}</li>
				{/each}
			</ul>
		</div>
		<div>

		</div>
	</div>
</Slide>
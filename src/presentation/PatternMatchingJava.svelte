<script lang="ts">
import Slide from '$lib/Slide.svelte';
import Code from '$lib/Code.svelte';
import Footnote from '$lib/Footnote.svelte';

type JavaJEP = {
	targetVersion: string,
	JEPNumber: number
}

type JavaFeature = {
	name: string,
	previewJEP?: JavaJEP,
	finalJEP?: JavaJEP
}

type PatternMatchingKeyword = {
	keyword: string,
	associatedFeatures?: JavaFeature[],
	exampleCode?: {
		desiredWidth?: string,
		code: string
	}
}

let patternMatchingTypes: PatternMatchingKeyword[] = [
	{
		keyword: 'enum, object, primitive types',
		associatedFeatures: [
			{
				name: 'Primitive Types in Patterns, instanceof, and switch',
				previewJEP: {
					targetVersion: '23',
					JEPNumber: 455
				}
			}
		],
		exampleCode: {
			code: `
enum PageLoadingState {
    LOADING,
    LOADED,
    ERROR,
}
final class Click implements WebEvent {
    private int x, y;
    // ...
}`,
			desiredWidth: '500px'
		}
	},
	{
		keyword: 'record',
		associatedFeatures: [
			{
				name: 'Record pattern',
				previewJEP: {
					targetVersion: '19',
					JEPNumber: 405
				},
				finalJEP: {
					targetVersion: '21',
					JEPNumber: 440
				}
			}
		],
		exampleCode: {
			desiredWidth: '550px',
			code: `record KeyPress(KeyEvent event) {}`
		}
	},
	{
		keyword: 'sealed class|interface',
		associatedFeatures: [
			{
				name: 'Sealed classes',
				previewJEP: {
					targetVersion: '15',
					JEPNumber: 360
				},
				finalJEP: {
					targetVersion: '17',
					JEPNumber: 409
				}
			}
		],
		exampleCode: {
			code: `
sealed class WebEvent permits Click, KeyPress, PageLoadingState {}
// ou
sealed interface WebEvent permits Click, KeyPress, PageLoadingState {}`,
			desiredWidth: '1200px'
		}

	}
];

let patternMatchingImplementations: PatternMatchingKeyword[] = [
	{
		keyword: 'instanceof',
		associatedFeatures: [
			{
				name: 'Pattern Matching for instanceof',
				previewJEP: {
					JEPNumber: 305,
					targetVersion: '14'
				},
				finalJEP: {
					targetVersion: '16',
					JEPNumber: 394
				}
			}
		],
		exampleCode: {
			code: `
// KeyPress: record
if (event instanceof KeyPress(KeyEvent keyEvent)) {
		// ... utilisation de keyEvent ...
}
// Click: class
if (event instanceof Click click) {
		return String.format("Clicked at x=%d, y=%d", click.getX(), click.getY());
}
`,
			desiredWidth: '1150px'
		}
	},
	{
		keyword: 'switch',
		associatedFeatures: [
			{
				name: 'Pattern Matching for switch',
				previewJEP: {
					JEPNumber: 406,
					targetVersion: '17'
				},
				finalJEP: {
					targetVersion: '21',
					JEPNumber: 441
				}
			}
		],
		exampleCode: {
			code: `
switch (event) {
		case PageLoadingState.ERROR -> "Error";
		case PageLoadingState _ -> "Page transition";
		case KeyPress(KeyEvent keyevent) when keyevent.getKeyCode() == 27 -> {
				System.out.println("Abort! Abort!");
				yield "Escape pressed";
		}
		case KeyPress(KeyEvent keyevent) -> String.format("Key pressed: %s", keyevent.getKeyChar());
		case Click click -> String.format("Clicked at x=%d, y=%d", click.getX(), click.getY());
}
`,
			desiredWidth: '1550px'
		}
	}
];

</script>
<style>
    ul {
        list-style: none;
        margin: 0;
        padding-inline-start: 0;
        text-align: center;

        li {
            padding-bottom: .5em;

            p {
                padding-bottom: 0;
                margin: 0;
            }
        }
    }

    p.feature-list {
        font-size: 0.7em;
    }

</style>

{#snippet JEPSnippet(jep: JavaJEP, isPreview: Boolean = false)}
	<span>
		{#if isPreview}<em>Preview</em>{/if} Java {jep.targetVersion}
		<a href="https://openjdk.org/jeps/{jep.JEPNumber}" target="_blank">JEP {jep.JEPNumber}</a>
	</span>
{/snippet}

{#snippet javaFeatureSnippet(feature: JavaFeature)}
<span>
	<em>{feature.name}</em>
	{#if feature.previewJEP || feature.finalJEP}
		(
		{#if feature.previewJEP}
			{@render JEPSnippet(feature.previewJEP, true)}
			{#if feature.finalJEP}
				&dash;
			{/if}
		{/if}
		{#if feature.finalJEP}
			{@render JEPSnippet(feature.finalJEP)}
		{/if}
		)
	{/if}
</span>
{/snippet}

{#snippet javaFeatureListSnippet(features: JavaFeature[])}
	<p class="feature-list">
		{#each features as feature}
			{@render javaFeatureSnippet(feature)}
		{/each}
	</p>
{/snippet}

{#snippet patternMatchingKeywordSnippet(keyword: PatternMatchingKeyword)}
	<div class="fragment">
		<p><code>{keyword.keyword}</code></p>
		{#if keyword.associatedFeatures}
			{@render javaFeatureListSnippet(keyword.associatedFeatures)}
		{/if}
		{#if keyword.exampleCode}
	<Code language="java" id="example-code" width="{keyword.exampleCode.desiredWidth ?? 'auto'}" lineNumbers="{null}">
		{keyword.exampleCode.code}
	</Code>
		{/if}
	</div>
{/snippet}


<Slide>
	<h3>Le <em>Pattern Matching</em> en Java &ndash; les types<sup>*</sup></h3>

	<ul>
		{#each patternMatchingTypes as keyword}
			<li>{@render patternMatchingKeywordSnippet(keyword)}</li>
		{/each}
	</ul>

	<Footnote>* Liste non exhaustive</Footnote>

</Slide>

<Slide>
	<h3>Le <em>Pattern Matching</em> en Java &ndash; les "filtres"</h3>

	<ul>
		{#each patternMatchingImplementations as keyword}
			<li>{@render patternMatchingKeywordSnippet(keyword)}</li>
		{/each}
	</ul>
</Slide>
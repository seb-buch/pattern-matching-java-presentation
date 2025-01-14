<script lang="ts">
import Slide from '$lib/Slide.svelte';
import Code from '$lib/Code.svelte';

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
\tLOADING,
\tLOADED,
\tERROR,
}

final class Click implements WebEvent {
\tprivate int x, y;
\t// ...
}`,
			desiredWidth: '550px'
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
// event: WebEvent
// KeyPress: record -> pattern matching 😃
if (event instanceof KeyPress(KeyEvent keyEvent)) {
\t// ... utilisation de keyEvent ...
}
// Click: class -> pattern matching 🫤
if (event instanceof Click click) {
\treturn String.format("Clicked at x=%d, y=%d", click.getX(), click.getY());
}
`,
			desiredWidth: '1200px'
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
// event: WebEvent
switch (event) {
\tcase PageLoadingState.ERROR -> "Error"; // pas de pattern matching
\tcase PageLoadingState _ -> "Page transition"; // motif ignoré
\tcase KeyPress(KeyEvent keyevent) when keyevent.getKeyCode() == 27 -> { // when
\t\tSystem.out.println("Abort! Abort!");
\t\tyield "Escape pressed";
\t}
\tcase KeyPress(KeyEvent keyevent) -> String.format("Key pressed: %s", keyevent.getKeyChar());
\tcase Click click -> String.format("Clicked at x=%d, y=%d", click.getX(), click.getY());
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
        font-size: 0.6em;
    }

    .grow-snippet {
        overflow: hidden;
        opacity: 0;
        max-height: 0;
        transition-property: max-height, opacity;
        transition-delay: 0s, 0.5s;
        transition-duration: 1s;
    }

    .grow-snippet.visible, li:first-child.grow-snippet {
        background: none;
        max-height: 500px;
        opacity: 1;
    }

</style>

{#snippet JEPSnippet(jep: JavaJEP, isPreview: boolean = false)}
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
	<p><code>{keyword.keyword}</code></p>
	{#if keyword.associatedFeatures}
		{@render javaFeatureListSnippet(keyword.associatedFeatures)}
	{/if}
	{#if keyword.exampleCode}
	<Code language="java" id="example-code" width="{keyword.exampleCode.desiredWidth ?? 'auto'}" lineNumbers="{null}">
		{keyword.exampleCode.code}
	</Code>
	{/if}
{/snippet}

{#snippet patternMatchingComponetSnippet(component: string, keywords: PatternMatchingKeyword[])}
	<Slide>
		<div style="display: flex; align-items: center; justify-content: flex-start;flex-direction: column; height: 100%">
			<h3>Le <em>Pattern Matching</em> en Java &ndash; {component}</h3>

			<ul style="display: flex; align-items: center; justify-content: center;flex-direction: column; flex-grow: 1">
				{#each keywords as keyword, index}
					<li class="grow-snippet visible {index===0 ? '' : 'fragment custom'}">
						{@render patternMatchingKeywordSnippet(keyword)}
					</li>
				{/each}
			</ul>
		</div>
	</Slide>
{/snippet}

{@render patternMatchingComponetSnippet("structure de données", patternMatchingTypes)}
{@render patternMatchingComponetSnippet("les \"filtres\" d'extraction", patternMatchingImplementations)}
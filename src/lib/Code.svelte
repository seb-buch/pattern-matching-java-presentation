<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		trim?: boolean | null;
		lineNumbers?: string | boolean | null;
		lineNumbersFrom?: number | null;
		language?: string;
		noescape?: boolean | null;
		id?: string | null;
		width?: string | null
		children: Snippet;
	}

	let {
		trim = true,
		lineNumbersFrom = 1,
		language = 'java',
		noescape = true,
		lineNumbers = true,
		id = null,
		width = "fit-content",
		children
	}: Props = $props();

</script>

<style>
    .code-block {
        position: relative;

        pre {
            min-width: 50%;
            max-width: 90%;

            code {
                padding: 0.7em;
                max-height: 1000px;
            }

            &:before {
                content: "";
                position: absolute;
                right: 1.5em;
                top: 0.5em;
                color: var(--r-main-color);
                opacity: 0.5;
                font-size: 0.5em;
            }

            &.language-java:before {
                content: "Java";
            }

            &.language-javascript:before {
                content: "Javascript";
            }
        }

    }
</style>

{#if children}
	<div class="code-block">
		<pre class="language-{language}" data-id="{id}" style="width:{width}">
		<code data-noescape={noescape} data-trim={trim} data-line-numbers={lineNumbers}
					data-ln-start-from={lineNumbersFrom}>
			{@render children()}
		</code>
	</pre>
	</div>
{/if}
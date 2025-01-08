<script lang="ts">
	type Props = {
		height:string
	}
	let {height}:Props = $props()
</script>

<div style="height: {height}"></div>
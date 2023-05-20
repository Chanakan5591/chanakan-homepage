<script lang="ts">
	import '../app.css';
	import Header from '../lib/header.svelte';
</script>

<div class="fixed mix-blend-difference w-full">
	<Header />
</div>
<div class="mx-auto pt-16">
	<slot />
</div>

<script lang="ts">
	import '../app.css';
	import Header from '../lib/header.svelte';
</script>

<div class="h-screen">
	<div class="fixed mix-blend-difference w-full">
		<Header />
	</div>
	<div class="mx-4 pt-16 h-full">
		<slot />
	</div>
</div>

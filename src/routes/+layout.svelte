<script lang="ts">
	import '../app.css';
	import Header from '../lib/header.svelte';
</script>

<div class="h-screen">
	<div class="fixed mix-blend-difference w-full">
		<Header />
	</div>
	<div class="mx-4 pt-16">
		<div class='absolute top-0 z-[-1] left-0 w-full h-full pointer-events-none'>
			<div class='absolute blur-md opacity-[0.5] top-[10%] right-[30%] w-[120px] h-[120px] bg-green-300 rounded-[50%] animate-floatEight'></div>
			<div class='absolute blur-md opacity-[0.5] top-[20%] left-[15%] w-[150px] h-[150px] bg-blue-300 animate-floatTen'></div>
			<div class='absolute blur-md opacity-[0.5] right-[40%] bottom-[10%] w-[80px] h-[80px] bg-red-300 animate-floatTwelve'></div>
		</div>
		<slot />
	</div>
</div>

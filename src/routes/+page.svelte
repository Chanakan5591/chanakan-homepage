<script lang="ts">
	import pfp from '$lib/assets/pfp.jpeg';
	import { ArrowDown } from 'lucide-svelte';
</script>

<div
	class="flex flex-col md:flex-row justify-between text-6xl sm:text-7xl md:text-9xl mb-2 gap-y-8 md:gap-y-24 p-4 mt-8"
>
	<div class="justify-self-start">
		<h1 class="title">Passionate</h1>
		<h1 class="title">Developer</h1>
		<div class="flex flex-col mt-8">
			<span class="text-lg">
				Hello! I am Chanakan Mungtin. I am a passionate developer and a student resided in Thailand.
				I am currently interested in SDR and aviation stuff in general, and also rocketry. I also
				enjoy photography from time to time, while not being too serious about it.
			</span>
		</div>
	</div>

	<div class="items-end flex self-end flex-col-reverse md:flex-col">
		<img
			src={pfp}
			class="self-start md:self-center border-black mt-16 md:mt-0 border-2 w-full max-w-xs mb-14"
			alt="myself"
		/>
		<div class="flex items-end flex-col">
			<h1 class="title">Chanakan</h1>
			<h1 class="title">Mungtin</h1>
		</div>
	</div>
</div>

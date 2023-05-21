<script lang="ts">
	import pfp from '$lib/assets/pfp.jpeg';
	import { ArrowDown } from 'lucide-svelte';
</script>

<!-- Masthead -->
<div class="flex flex-col text-6xl md:text-8xl lg:text-9xl gap-y-8 m-4 mb-16 lg:h-full lg:mb-0">
	<div class="flex flex-col-reverse md:flex-row justify-between items-center">
		<div class="h-fit">
			<h1 class="title">Passionate</h1>
			<h1 class="title">Developer</h1>
			<div class="flex flex-col mt-8 max-w-3xl">
				<span class="text-lg mr-4">
					Hello! I am Chanakan Mungtin. I am a passionate developer and a student resided in
					Thailand. I am currently interested in SDR and aviation stuff in general, and also
					rocketry. I also enjoy photography from time to time, while not being too serious about
					it.
				</span>
			</div>
		</div>
		<img
			src={pfp}
			class="max-w-[14rem] lg:max-w-xs mb-4 md:mb-0 w-full border-black border-2 ml-4"
			alt="myself"
		/>
	</div>

	<div class="flex items-end flex-col">
		<h1 class="title">Chanakan</h1>
		<h1 class="title">Mungtin</h1>
	</div>
</div>

<!-- new -->
<div class="flex flex-col md:flex-row justify-center md:justify-between max-w-xl mx-auto">
	<div class="flex flex-col">
		<h1 class="text-5xl title mb-2">Skills</h1>
		<ul class="text-xl list-disc list-inside">
			<li>Programming</li>
			<li>Photography</li>
			<li>Machine Learning</li>
			<li>Data Analysis</li>
		</ul>
	</div>
	<div class="flex flex-col self-end md:self-start mt-4 md:mt-0">
		<h1 class="text-5xl title">Education</h1>
		<ul class="text-xl list-disc list-inside">
			<li>yo</li>
		</ul>
	</div>
</div>

<script lang="ts">
	import { enhance } from '$app/forms';
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
<div
	class="flex flex-col md:gap-x-8 md:flex-row justify-center md:justify-between w-screen max-w-[60%] mx-auto"
>
	<div class="flex flex-col self-end md:self-start mt-4 md:mt-0">
		<h1 class="text-5xl title mb-2">Skills</h1>
		<ul class="text-xl list-disc list-inside">
			<li>Programming</li>
			<li>Photography</li>
			<li>Machine Learning</li>
			<li>Data Analysis</li>
		</ul>
	</div>
	<div class="flex flex-col self-end md:self-start mt-4 md:mt-0">
		<h1 class="text-5xl title mb-2">Education</h1>
		<ul class="text-xl list-disc list-inside">
			<li><span class="font-bold">2008 - 2017</span> Prempracha Wattana School</li>
			<li>
				<span class="font-bold">2018 - 2020</span> Kanjanapisek Witthayalai Nakornphathom School
			</li>
			<li><span class="font-bold">2021 - Present</span> Chitralada Vocational School</li>
		</ul>
	</div>
</div>

<div class="flex flex-col gap-x-8 mt-16 justify-center max-w-xl mx-auto mb-8 pb-8">
	<span class="text-5xl font-bold font-serif mb-4">Contact Me</span>
	<form
		class="flex flex-col gap-y-2 justify-center"
		action="https://formspree.io/xoqrkkbg"
		method="post"
	>
		<label for="email" class="text-xl font-semibold">Your Email: </label>
		<input
			class="p-2 border-black border-2"
			placeholder="Email here"
			id="email"
			type="email"
			name="email"
		/>
		<label for="message" class="text-xl font-semibold">Your message:</label>
		<textarea
			id="message"
			name="message"
			class="border-black border-2 p-2"
			rows="10"
			placeholder="Your message here"
		/>
		<button class="p-4 bg-white border-black border-2 w-32 mt-2 font-bold text-lg" type="submit"
			>Send</button
		>
	</form>
</div>

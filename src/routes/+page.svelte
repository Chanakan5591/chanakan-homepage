<script lang="ts">
	import pfp from '$lib/assets/pfp.jpeg';
	import { onMount } from 'svelte';
	import { slide, fade } from 'svelte/transition';

	let showFirst = false,
		showSecond = false,
		showName = false,
		showLast = false,
		shouldShowAll = false;

	onMount(() => {
		setTimeout(() => (showFirst = true), 50);
		setTimeout(() => (showSecond = true), 100);
		setTimeout(() => (showName = true), 50);
		setTimeout(() => (showLast = true), 100);
		setTimeout(() => (shouldShowAll = true), 400);
	});
</script>

<!-- Masthead -->
<div class="flex flex-col text-6xl md:text-8xl lg:text-9xl gap-y-8 m-4 mb-16">
	<div class="flex flex-col-reverse md:flex-row justify-between items-center">
		<div class="h-fit">
			{#if showFirst}
				<h1 class="title leading-none" transition:slide={{ duration: 1000, axis: 'x' }}>
					Passionate
				</h1>
			{/if}
			{#if showSecond}
				<h1 class="title leading-snug" transition:slide={{ duration: 1000, axis: 'x' }}>
					Developer
				</h1>
			{/if}
			{#if showName}
				<div class="flex flex-col mt-8 max-w-3xl" transition:slide>
					<span class="text-lg mr-4">
						Hello! I am Chanakan Moongthin. I am a passionate developer and a student resided in
						Thailand. I am a man with multiple hobbies, including, but not limited to: <span class='font-semibold'>Software-Defined Radio</span>, <span class='font-semibold'>Aviation</span>, <span class='font-semibold'>GIS</span>, <span class='font-semibold'>Software & Web Development</span>, Making things with <span class='font-semibold'>LLMs</span>, <span class='font-semibold'>Graphics Designing</span>, <span class='font-semibold'>Music Making</span> and currently mainly interested in <span class='font-bold'>Production</span>. I also enjoy <span class='font-bold'>Photography</span> from time to time as mostly film photography, while not being too serious about
						it.
					</span>
				</div>
			{/if}
		</div>
		<img
			src={pfp}
			class="max-w-[14rem] lg:max-w-xs mb-4 md:mb-0 w-full border-black border-2 ml-4"
			alt="myself"
		/>
	</div>

	<div class="flex items-end flex-col">
		{#if showName}
			<h1 class="title leading-none" transition:slide={{ duration: 1000, axis: 'x' }}>Chanakan</h1>
		{/if}
		{#if showLast}
			<h1 class="title leading-snug" transition:slide={{ duration: 1000, axis: 'x' }}>Moongthin</h1>
		{/if}
	</div>
</div>

<!-- new -->
{#if shouldShowAll}
	<div
		transition:fade
		class="flex flex-col md:gap-x-8 md:flex-row justify-between w-screen max-w-[60%] md:mx-auto"
	>
		<div class="flex flex-col mt-4 md:mt-0">
			<h1 class="text-5xl title mb-2">Skills</h1>
			<ul class="text-xl list-disc list-inside">
				<li>Programming</li>
				<li>Photography</li>
				<li>Machine Learning</li>
				<li>Data Analysis</li>
			</ul>
		</div>
		<div class="flex flex-col mt-4 md:mt-0">
			<h1 class="text-5xl title mb-2">Education</h1>
			<ul class="text-xl list-disc list-inside">
				<li><span class="font-bold">2008 - 2017</span> Prempracha Wattana School</li>
				<li>
					<span class="font-bold">2018 - 2020</span> Kanjanapisek Witthayalai Nakornphathom School
				</li>
				<li><span class="font-bold">2021 - 2023</span> Chitralada Vocational School</li>
				<li>
					<span class="font-bold">2024 - Present</span> ICT @ Mahidol University</li>
			</ul>
		</div>
	</div>

	<div
		class="flex flex-col gap-x-8 mt-16 justify-center max-w-xl mx-auto mb-8 pb-8"
		transition:fade
	>
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
{/if}

<script lang="ts">
	export let path: string;
</script>

<a class="link link-hover mix-blend-difference text-white text-xl" href={path}
	><span><slot /></span></a
>

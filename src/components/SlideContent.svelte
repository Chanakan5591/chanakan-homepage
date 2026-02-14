<script>
  let { children } = $props();
</script>

<div class="text-content">
  {@render children()}
</div>

<style>
  .text-content {
    position: absolute;
    transition: opacity 0.2s linear;
    will-change: opacity;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>

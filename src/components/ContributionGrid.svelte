<script>
  /** @type {{ weeks: Array<{ contributionDays: Array<{ contributionCount: number, date: string, color: string }> }> }} */
  let { weeks } = $props();

  const cellSize = 13;
  const cellGap = 3;
  const totalSize = cellSize + cellGap;

  let tooltip = $state({ show: false, x: 0, y: 0, text: '' });

  function handleMouseEnter(e, day) {
    const rect = e.target.getBoundingClientRect();
    tooltip = {
      show: true,
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
      text: `${day.contributionCount} contributions on ${new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
    };
  }

  function handleMouseLeave() {
    tooltip = { ...tooltip, show: false };
  }

  // Map GitHub colors to our green terminal palette
  function getColor(count) {
    if (count === 0) return 'rgba(255,255,255,0.06)';
    if (count <= 3) return 'rgba(0,204,102,0.25)';
    if (count <= 6) return 'rgba(0,204,102,0.45)';
    if (count <= 9) return 'rgba(0,204,102,0.7)';
    return 'rgba(0,204,102,1)';
  }

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
</script>

<div class="contribution-grid-wrapper">
  {#if tooltip.show}
    <div class="grid-tooltip" style="left: {tooltip.x}px; top: {tooltip.y}px;">
      {tooltip.text}
    </div>
  {/if}

  <svg
    width={weeks.length * totalSize + 30}
    height={7 * totalSize + 24}
    class="contribution-grid"
  >
    <!-- Month labels -->
    {#each weeks as week, wi}
      {#if wi === 0 || new Date(week.contributionDays[0]?.date).getDate() <= 7}
        <text
          x={wi * totalSize + 30}
          y={10}
          class="month-label"
          fill="rgba(255,255,255,0.4)"
          font-size="10"
          font-family="var(--font-mono)"
        >
          {months[new Date(week.contributionDays[0]?.date).getMonth()]}
        </text>
      {/if}
    {/each}

    <!-- Day labels -->
    {#each ['', 'Mon', '', 'Wed', '', 'Fri', ''] as label, i}
      {#if label}
        <text
          x={16}
          y={i * totalSize + 30}
          class="day-label"
          fill="rgba(255,255,255,0.3)"
          font-size="9"
          font-family="var(--font-mono)"
          text-anchor="end"
        >{label}</text>
      {/if}
    {/each}

    <!-- Cells -->
    {#each weeks as week, wi}
      {#each week.contributionDays as day, di}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <rect
          x={wi * totalSize + 30}
          y={di * totalSize + 18}
          width={cellSize}
          height={cellSize}
          rx="2"
          fill={getColor(day.contributionCount)}
          class="grid-cell"
          onmouseenter={(e) => handleMouseEnter(e, day)}
          onmouseleave={handleMouseLeave}
        />
      {/each}
    {/each}
  </svg>
</div>

<style>
  .contribution-grid-wrapper {
    overflow-x: auto;
    padding-bottom: 8px;
  }

  .grid-cell {
    transition: opacity 0.15s ease;
    cursor: pointer;
  }

  .grid-cell:hover {
    stroke: rgba(0,204,102,0.6);
    stroke-width: 1.5;
  }

  .grid-tooltip {
    position: fixed;
    transform: translate(-50%, -100%);
    background: #2a2a2a;
    color: rgba(255,255,255,0.9);
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 11px;
    font-family: var(--font-mono);
    white-space: nowrap;
    pointer-events: none;
    z-index: 100;
    border: 1px solid rgba(0,204,102,0.3);
  }
</style>

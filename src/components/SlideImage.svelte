<script>
  let { image, imageClass = "", decorationStyle = "full" } = $props();
  // decorationStyle: "full" (Option B - grid + corners), "minimal" (Option A - corners only), "none"
</script>

<div class="image-content">
  <div class="relative w-full h-full">
    <!-- Editorial decorations - OUTSIDE the image container -->
    {#if decorationStyle === "full" || decorationStyle === "minimal"}
      <div class="editorial-frame pointer-events-none">
        <!-- Corner brackets -->
        <div class="corner corner-tl"></div>
        <div class="corner corner-tr"></div>
        <div class="corner corner-bl"></div>
        <div class="corner corner-br"></div>
        
        {#if decorationStyle === "full"}
          <!-- Registration marks (like print production marks) -->
          <div class="reg-mark reg-top"></div>
          <div class="reg-mark reg-bottom"></div>
          <div class="reg-mark reg-left"></div>
          <div class="reg-mark reg-right"></div>
          
          <!-- Corner tick marks -->
          <div class="tick tick-tl-h"></div>
          <div class="tick tick-tl-v"></div>
          <div class="tick tick-tr-h"></div>
          <div class="tick tick-tr-v"></div>
          <div class="tick tick-bl-h"></div>
          <div class="tick tick-bl-v"></div>
          <div class="tick tick-br-h"></div>
          <div class="tick tick-br-v"></div>
        {/if}
      </div>
    {/if}
    
    <div class="relative w-full h-full overflow-hidden image-box">
      <img 
        src={image?.src}
        srcset={image?.srcset?.attribute}
        class="w-full h-full object-cover {imageClass}"
        alt={image?.options?.alt || ''}
        loading="eager"
        decoding="async"
      />
      
      <!-- Triangle corner decoration (your existing paper fold) -->
      <div class="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 pointer-events-none">
        <div class="absolute inset-0 bg-[rgb(247,245,242)]" style="clip-path: polygon(0 0, 100% 0, 0 100%); transform: scale(1.05);"></div>
      </div>
    </div>
  </div>
</div>

<style>
  .image-content {
    position: absolute;
    transition: opacity 0.2s linear;
    will-change: opacity;
    inset: 0;
  }

  .editorial-frame {
    position: absolute;
    inset: -12px;
    z-index: 5;
  }

  .image-box {
    position: relative;
    z-index: 1;
  }

  /* Corner L-brackets (outside the image) */
  .corner {
    position: absolute;
    width: 16px;
    height: 16px;
  }

  .corner::before,
  .corner::after {
    content: '';
    position: absolute;
    background-color: rgba(30, 30, 30, 0.5);
  }

  .corner::before {
    width: 100%;
    height: 1px;
  }

  .corner::after {
    width: 1px;
    height: 100%;
  }

  /* Top-left corner */
  .corner-tl {
    top: 0;
    left: 0;
  }
  .corner-tl::before {
    top: 0;
    left: 0;
  }
  .corner-tl::after {
    top: 0;
    left: 0;
  }

  /* Top-right corner */
  .corner-tr {
    top: 0;
    right: 0;
  }
  .corner-tr::before {
    top: 0;
    right: 0;
  }
  .corner-tr::after {
    top: 0;
    right: 0;
  }

  /* Bottom-left corner */
  .corner-bl {
    bottom: 0;
    left: 0;
  }
  .corner-bl::before {
    bottom: 0;
    left: 0;
  }
  .corner-bl::after {
    bottom: 0;
    left: 0;
  }

  /* Bottom-right corner */
  .corner-br {
    bottom: 0;
    right: 0;
  }
  .corner-br::before {
    bottom: 0;
    right: 0;
  }
  .corner-br::after {
    bottom: 0;
    right: 0;
  }

  /* Registration marks (like print production) */
  .reg-mark {
    position: absolute;
    background-color: rgba(30, 30, 30, 0.4);
  }

  .reg-mark::before,
  .reg-mark::after {
    content: '';
    position: absolute;
    background-color: rgba(30, 30, 30, 0.4);
  }

  /* Top registration mark */
  .reg-top {
    top: -6px;
    left: 50%;
    width: 1px;
    height: 10px;
    transform: translateX(-50%);
  }
  .reg-top::before {
    top: 50%;
    left: 50%;
    width: 6px;
    height: 1px;
    transform: translate(-50%, -50%);
  }

  /* Bottom registration mark */
  .reg-bottom {
    bottom: -6px;
    left: 50%;
    width: 1px;
    height: 10px;
    transform: translateX(-50%);
  }
  .reg-bottom::before {
    top: 50%;
    left: 50%;
    width: 6px;
    height: 1px;
    transform: translate(-50%, -50%);
  }

  /* Left registration mark */
  .reg-left {
    left: -6px;
    top: 50%;
    width: 10px;
    height: 1px;
    transform: translateY(-50%);
  }
  .reg-left::before {
    top: 50%;
    left: 50%;
    width: 1px;
    height: 6px;
    transform: translate(-50%, -50%);
  }

  /* Right registration mark */
  .reg-right {
    right: -6px;
    top: 50%;
    width: 10px;
    height: 1px;
    transform: translateY(-50%);
  }
  .reg-right::before {
    top: 50%;
    left: 50%;
    width: 1px;
    height: 6px;
    transform: translate(-50%, -50%);
  }

  /* Corner tick marks */
  .tick {
    position: absolute;
    background-color: rgba(30, 30, 30, 0.3);
  }

  .tick-tl-h, .tick-tr-h, .tick-bl-h, .tick-br-h {
    width: 8px;
    height: 1px;
  }

  .tick-tl-v, .tick-tr-v, .tick-bl-v, .tick-br-v {
    width: 1px;
    height: 8px;
  }

  .tick-tl-h { top: 3px; left: -10px; }
  .tick-tl-v { top: -10px; left: 3px; }
  .tick-tr-h { top: 3px; right: -10px; }
  .tick-tr-v { top: -10px; right: 3px; }
  .tick-bl-h { bottom: 3px; left: -10px; }
  .tick-bl-v { bottom: -10px; left: 3px; }
  .tick-br-h { bottom: 3px; right: -10px; }
  .tick-br-v { bottom: -10px; right: 3px; }

  /* Responsive adjustments */
  @media (min-width: 640px) {
    .editorial-frame {
      inset: -16px;
    }

    .corner {
      width: 20px;
      height: 20px;
    }

    .corner::before {
      height: 1.5px;
    }

    .corner::after {
      width: 1.5px;
    }

    .reg-top, .reg-bottom {
      height: 12px;
      top: -8px;
    }
    
    .reg-bottom {
      bottom: -8px;
      top: auto;
    }

    .reg-left, .reg-right {
      width: 12px;
      left: -8px;
    }
    
    .reg-right {
      right: -8px;
      left: auto;
    }

    .reg-top::before, .reg-bottom::before {
      width: 8px;
    }

    .reg-left::before, .reg-right::before {
      height: 8px;
    }

    .tick-tl-h, .tick-tr-h, .tick-bl-h, .tick-br-h {
      width: 10px;
    }

    .tick-tl-v, .tick-tr-v, .tick-bl-v, .tick-br-v {
      height: 10px;
    }

    .tick-tl-h, .tick-bl-h { left: -12px; }
    .tick-tr-h, .tick-br-h { right: -12px; }
    .tick-tl-v, .tick-tr-v { top: -12px; }
    .tick-bl-v, .tick-br-v { bottom: -12px; }
    .tick-tl-h, .tick-tr-h { top: 4px; }
    .tick-bl-h, .tick-br-h { bottom: 4px; }
    .tick-tl-v, .tick-bl-v { left: 4px; }
    .tick-tr-v, .tick-br-v { right: 4px; }
  }

  @media (min-width: 768px) {
    .editorial-frame {
      inset: -24px;
    }

    .corner {
      width: 28px;
      height: 28px;
    }

    .corner::before {
      height: 2px;
    }

    .corner::after {
      width: 2px;
    }

    .reg-top, .reg-bottom {
      height: 16px;
    }

    .reg-left, .reg-right {
      width: 16px;
    }

    .tick-tl-h, .tick-tr-h, .tick-bl-h, .tick-br-h {
      width: 14px;
    }

    .tick-tl-v, .tick-tr-v, .tick-bl-v, .tick-br-v {
      height: 14px;
    }

    .tick-tl-h, .tick-bl-h { left: -18px; }
    .tick-tr-h, .tick-br-h { right: -18px; }
    .tick-tl-v, .tick-tr-v { top: -18px; }
    .tick-bl-v, .tick-br-v { bottom: -18px; }
  }
</style>

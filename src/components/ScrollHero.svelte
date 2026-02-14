<script>
  import { onMount } from 'svelte';
  import { gsap } from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import SlideContent from './SlideContent.svelte';
  import SlideImage from './SlideImage.svelte';

  let { 
    heroImage = null,
    profileImage = null, 
    profileSquareImage = null 
  } = $props();

  const SLIDE_COUNT = 3;
  const LINGER_PERCENT = 0.6; // 60% of scroll is at full opacity
  const TRANSITION_PERCENT = 0.4; // 40% of scroll is transition

  let scrollContainer = $state(null);
  let totalContributions = $state(null);
  let totalCommits = $state(null);
  let metricsContainer = $state(null);
  
  // Arrays to hold slide elements
  let slideContents = $state([]);
  let slideImages = $state([]);

  onMount(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Use the scrollContainer as the scroller
    ScrollTrigger.defaults({
      scroller: scrollContainer
    });

    // Set initial states - first slide visible, rest hidden
    gsap.set(slideContents[0], { opacity: 1 });
    gsap.set(slideImages[0], { opacity: 1 });
    gsap.set(metricsContainer, { opacity: 1 });
    
    for (let i = 1; i < SLIDE_COUNT; i++) {
      gsap.set([slideContents[i], slideImages[i]], { opacity: 0 });
    }

    // Create animations for each slide
    for (let i = 0; i < SLIDE_COUNT; i++) {
      const elements = i === 0 
        ? [slideContents[i], slideImages[i], metricsContainer]
        : [slideContents[i], slideImages[i]];
      
      // Linger and fade out timeline (for all slides except the last)
      if (i < SLIDE_COUNT - 1) {
        gsap.timeline({
          scrollTrigger: {
            trigger: `[data-index="${i}"]`,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.1, // Faster response to prevent lag
            invalidateOnRefresh: true,
          }
        })
        .to(elements, {
          opacity: 1,
          duration: LINGER_PERCENT,
          ease: 'none',
          immediateRender: false
        })
        .to(elements, {
          opacity: 0,
          duration: TRANSITION_PERCENT,
          ease: 'none',
          immediateRender: false
        });
      }

      // Fade in from previous slide (for all slides except the first)
      if (i > 0) {
        gsap.timeline({
          scrollTrigger: {
            trigger: `[data-index="${i - 1}"]`,
            start: `${LINGER_PERCENT * 100}% top`,
            end: 'bottom top',
            scrub: 0.1, // Faster response to prevent lag
            invalidateOnRefresh: true,
          }
        })
        .to([slideContents[i], slideImages[i]], {
          opacity: 1,
          duration: TRANSITION_PERCENT,
          ease: 'none',
          immediateRender: false
        });
      }
    }

    // Fetch contributions data
    fetch('/api/commits')
      .then(res => res.json())
      .then(data => {
        totalContributions = data.total;
        totalCommits = data.commits;
        
        // Wait for Svelte to render the metrics DOM elements
        setTimeout(() => {
          // Animate metrics entrance with staggered fade-in and slide-up
          const metricItems = metricsContainer?.querySelectorAll('.metric-item');
          if (metricItems && metricItems.length > 0) {
            gsap.fromTo(metricItems, 
              {
                opacity: 0,
                y: 30,
                scale: 0.95
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: 'power3.out',
                stagger: 0.15,
                onStart: function() {
                  // Animate the numbers counting up
                  const numberElements = metricsContainer.querySelectorAll('.metric-number');
                  numberElements.forEach((el, index) => {
                    const targetValue = index === 0 ? data.commits : data.total;
                    gsap.from(el, {
                      textContent: 0,
                      duration: 1.5,
                      ease: 'power2.out',
                      delay: index * 0.15,
                      snap: { textContent: 1 },
                      onUpdate: function() {
                        el.textContent = Math.round(this.targets()[0].textContent).toLocaleString();
                      }
                    });
                  });
                }
              }
            );
          }
        }, 50);
      })
      .catch(err => {
        console.error('Failed to fetch contributions:', err);
      });
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  });
</script>

<div class="relative w-full h-screen font-sans">
  <!-- Scroll container for GSAP ScrollTrigger -->
  <div
    bind:this={scrollContainer}
    class="absolute inset-0 overflow-y-scroll scroll-container"
  >
    <div class="h-screen" data-index="0"></div>
    <div class="h-screen" data-index="1"></div>
    <div class="h-screen" data-index="2"></div>
  </div>

  <div class="absolute inset-0 pointer-events-none">
    <div class="w-full h-screen px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 pt-16 sm:pt-20 md:pt-24 pb-20 md:pb-12 lg:pb-16 flex items-center md:items-end">
      <div class="w-full flex flex-col md:flex-row items-stretch md:items-end gap-3 md:gap-0">
        
        <!-- Text Content Side -->
        <div class="w-full md:flex-1 relative shrink-0 md:h-[80dvh] order-2 md:order-1">
          
          <!-- Dashboard metrics - positioned at top on desktop, integrated on mobile -->
          <div bind:this={metricsContainer} class="md:absolute md:top-0 left-0 right-0 mb-3 md:mb-4">
            {#if totalContributions !== null || totalCommits !== null}
              <div class="flex gap-6 sm:gap-8 md:gap-12">
                {#if totalCommits !== null}
                  <div class="metric-item">
                    <div class="metric-number text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif text-black leading-none">
                      {totalCommits.toLocaleString()}
                    </div>
                    <div class="text-xs sm:text-sm font-sans uppercase tracking-wider text-black/50 mt-1">
                      Commits
                    </div>
                  </div>
                {/if}
                {#if totalContributions !== null}
                  <div class="metric-item">
                    <div class="metric-number text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif text-black leading-none">
                      {totalContributions.toLocaleString()}
                    </div>
                    <div class="text-xs sm:text-sm font-sans uppercase tracking-wider text-black/50 mt-1">
                      Contributions
                    </div>
                  </div>
                {/if}
              </div>
            {/if}
          </div>
          
          <!-- Slide 1 -->
          <div bind:this={slideContents[0]}>
            <SlideContent>
              <h1 class="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-[0.9] text-black">
                Chanakan Moongthin
              </h1>
              <div class="mt-3 md:mt-4 lg:mt-6 space-y-0.5 md:space-y-1">
                <p class="font-serif text-sm sm:text-base md:text-lg lg:text-xl uppercase text-black tracking-wide">
                  DEVELOPER & CREATOR
                </p>
                <p class="font-serif text-sm sm:text-base md:text-lg lg:text-xl uppercase text-black tracking-wide">
                  BRIDGING LOGIC WITH LIVED EXPERIENCES
                </p>
              </div>
            </SlideContent>
          </div>

          <!-- Slide 2 -->
          <div bind:this={slideContents[1]}>
            <SlideContent>
              <h1 class="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-[0.9] text-black">
                About
              </h1>
              <div class="mt-3 md:mt-4 lg:mt-6 space-y-0.5 md:space-y-1">
                <p class="font-serif text-sm sm:text-base md:text-lg lg:text-2xl xl:text-4xl tracking-wide leading-relaxed">
                  Chanakan 
                  <img 
                    src={profileSquareImage?.src}
                    srcset={profileSquareImage?.srcset?.attribute}
                    class="inline-block w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-contain mb-1"
                    alt="Chanakan Profile"
                  /> 
                  Developer and creator
                </p>
              </div>
            </SlideContent>
          </div>

          <!-- Slide 3 -->
          <div bind:this={slideContents[2]}>
            <SlideContent>
              <h1 class="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-[0.9] text-black">
                Design Meets Function
              </h1>
              <div class="mt-3 md:mt-4 lg:mt-6 space-y-0.5 md:space-y-1">
                <p class="font-serif text-sm sm:text-base md:text-lg lg:text-xl uppercase text-black tracking-wide">
                  CRAFTING EXPERIENCES
                </p>
                <p class="font-serif text-sm sm:text-base md:text-lg lg:text-xl uppercase text-black tracking-wide">
                  THAT INSPIRE AND ENGAGE
                </p>
              </div>
            </SlideContent>
          </div>

        </div>

        <!-- Image Content Side -->
        <div class="w-full md:flex-1 h-[35vh] md:h-[80dvh] relative shrink-0 order-1 md:order-2">
          <div bind:this={slideImages[0]}>
            <SlideImage image={heroImage} imageClass="grayscale" />
          </div>
          <div bind:this={slideImages[1]}>
            <SlideImage image={profileImage} imageClass="brightness-110" />
          </div>
          <div bind:this={slideImages[2]}>
            <SlideImage image={heroImage} imageClass="grayscale contrast-125" />
          </div>
        </div>

      </div>
    </div>
    
  </div>
</div>

<style>
  .scroll-container::-webkit-scrollbar {
    display: none;
  }
  .scroll-container {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  /* Prevent text glitches during fast scrolling and animations */
  :global(.metric-item) {
    opacity: 0;
    will-change: opacity, transform;
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
    transform: translateZ(0);
  }
</style>
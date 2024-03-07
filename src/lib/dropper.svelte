<div class="ink">
    <div class="ripple"><svg class="ripple-ridge" viewBox="0 0 100 10"><path d="M 0 10 C 35 10 35 0 50 0 C 65 0 65 10 100 10"></path></svg><svg class="ripple-ridge" viewBox="0 0 100 10"><path d="M 0 10 C 35 10 35 0 50 0 C 65 0 65 10 100 10"></path></svg></div>
    <div class="ripple"><svg class="ripple-ridge" viewBox="0 0 100 10"><path d="M 0 10 C 35 10 35 0 50 0 C 65 0 65 10 100 10"></path></svg><svg class="ripple-ridge" viewBox="0 0 100 10"><path d="M 0 10 C 35 10 35 0 50 0 C 65 0 65 10 100 10"></path></svg></div>
    <div class="ripple"><svg class="ripple-ridge" viewBox="0 0 100 10"><path d="M 0 10 C 35 10 35 0 50 0 C 65 0 65 10 100 10"></path></svg><svg class="ripple-ridge" viewBox="0 0 100 10"><path d="M 0 10 C 35 10 35 0 50 0 C 65 0 65 10 100 10"></path></svg></div>
    <div class="ripple"><svg class="ripple-ridge" viewBox="0 0 100 10"><path d="M 0 10 C 35 10 35 0 50 0 C 65 0 65 10 100 10"></path></svg><svg class="ripple-ridge" viewBox="0 0 100 10"><path d="M 0 10 C 35 10 35 0 50 0 C 65 0 65 10 100 10"></path></svg></div>
    <div class="ripple"><svg class="ripple-ridge" viewBox="0 0 100 10"><path d="M 0 10 C 35 10 35 0 50 0 C 65 0 65 10 100 10"></path></svg><svg class="ripple-ridge" viewBox="0 0 100 10"><path d="M 0 10 C 35 10 35 0 50 0 C 65 0 65 10 100 10"></path></svg></div>
    <div class="ripple"><svg class="ripple-ridge" viewBox="0 0 100 10"><path d="M 0 10 C 35 10 35 0 50 0 C 65 0 65 10 100 10"></path></svg><svg class="ripple-ridge" viewBox="0 0 100 10"><path d="M 0 10 C 35 10 35 0 50 0 C 65 0 65 10 100 10"></path></svg></div>
    <div class="ripple"><svg class="ripple-ridge" viewBox="0 0 100 10"><path d="M 0 10 C 35 10 35 0 50 0 C 65 0 65 10 100 10"></path></svg><svg class="ripple-ridge" viewBox="0 0 100 10"><path d="M 0 10 C 35 10 35 0 50 0 C 65 0 65 10 100 10"></path></svg></div>
</div>
<div class="eyedropper" tabindex="1">
    <div class="droplet" style="--i: 0;"></div>
    <div class="eyedropper-loader"></div><svg class="eyedropper-svg" viewBox="0 0 44.42 100"><polyline class="eyedropper-fill" id="pipette-shape" style="stroke-width:3.6299" points="12.29,40.84 12.29,86.73 19.01,89.51 19.01,98.19 25.41,98.19 25.41,89.51 32.12,86.73 32.12,40.84"></polyline><line class="eyedropper-cap" style="stroke-width:18.1496;" x1="0" y1="31.76" x2="44.42" y2="31.76"></line><line class="eyedropper-cap" style="stroke-width:22.687;stroke-linecap:round;" x1="22.21" y1="11.34" x2="22.21" y2="27.83"></line></svg></div>
<div
    class="bubbles">
    <div class="bubble" style="--color: hsl(210 90% 54%)"></div>
    </div>
    <div class="intro">
        <div class="intro-content">Click on the dropper <span class="emoji">👆</span>, to activate it</div>
    </div>
    <div class="no-support">Eyedropper API is not supported in your browser</div>
    <script lang="ts">
      document.addEventListener('DOMContentLoaded', function () {
      if (window.EyeDropper) {
          const eyeDropper = new EyeDropper();
          const openEyeDropper = async () => {
              const introElement = document.querySelector('.intro') as HTMLElement | null;
              introElement?.remove();
              document.body.classList.remove('filled');
              document.body.classList.add('loading');
              try {
                  const { sRGBHex: color } = await eyeDropper.open();
                  document.body.style.setProperty('--color', color);
                  document.body.classList.add('filled');
              } catch (err) {
                  // Canceled
              } finally {
                  document.body.classList.remove('loading');
              }
          };
  
          const eyeDropperEl = document.querySelector('.eyedropper') as HTMLElement | null;
          if (eyeDropperEl) {
              eyeDropperEl.addEventListener('click', openEyeDropper);
              eyeDropperEl.addEventListener('keydown', (e) => {
                  if (['Enter', ' '].includes(e.key)) {
                      openEyeDropper();
                  }
              });
          }
      } else {
          const noSupportElement = document.querySelector('.no-support') as HTMLElement | null;
          if (noSupportElement) {
              noSupportElement.style.display = 'block';
          }
      }
  
      // Bubbles
      // Middle area where the eyedropper image is
      const deadZone = 15;
      document.querySelectorAll('.bubble').forEach((bubble, i, list) => {
          const total = list.length;
          bubble.style.setProperty('--size', `${Math.round(Math.random() * 16) + 8}vh`);
          const widthWithoutDeadZone = (100 - deadZone);
          let x = Math.round(i / total * widthWithoutDeadZone);
          if (x > widthWithoutDeadZone / 2) {
              x += deadZone;
          }
          bubble.style.setProperty('--x', x / 100);
          bubble.style.setProperty('--y', `${Math.random().toFixed(2)}`);
          bubble.style.setProperty('--hue', i * 360 / total);
          bubble.style.setProperty('--delay', `${(Math.random() * -7).toFixed(2)}s`);
      });
  
      // Droplets and ripples
      const ripples = document.querySelectorAll('.ripple');
      document.querySelectorAll('.droplet').forEach((droplet, i) => {
          const delay = Math.log2(i + 1) * 0.2 + i * 0.2;
          droplet.style.setProperty('--delay', `${(delay).toFixed(3)}s`);
          ripples[i].style.setProperty('--delay', `${(delay - i ** 2 * .005 + 0.2).toFixed(3)}s`);
      });
  
      // Eyedropper clip
      const svgEl = document.querySelector('.eyedropper-svg') as SVGSVGElement | null;
      if (svgEl) {
          const w = svgEl.viewBox.baseVal.width;
          const h = svgEl.viewBox.baseVal.height;
          const points = [];
          for (const { x, y } of document.querySelector('#pipette-shape').points) {
              points.push([x / w * 100, y / h * 100]);
          }
          document.documentElement.style.setProperty('--pipette-polygon', points.map(([x, y]) => `${x}% ${y}%`).join(', '));
      }
  });
  
  </script>
<!-- CSS -->
<style>
    :root {
	--color: wheat;
	--ink-load-time: .5s;
	--ink-fill-time: 2.5s;
	--ripple-time: 1.5s;
}
/* body not used */
.ink {
  height: 100vh;
  background: var(--color);
  transition: transform var(--ink-fill-time) var(--ink-load-time) cubic-bezier(0.53, 0.03, 0.95, 0.23);
}

body:not(.filled) .ink {
  transform: translateY(100%);
  transition: none;
}

.ripple {
	position: absolute;
	left: 50%;
	translate: -50%;
	top: 0;
	width: 60vh;
	aspect-ratio: 20 / 1;
	display: flex;
	justify-content: space-between;
}

body.filled .ripple {
  animation: ripple linear var(--ripple-time) calc(var(--ink-load-time) + var(--delay));
}

@keyframes ripple {
	5%,
	100% {
		transform: translateY(-98%);
	}
}

.ripple-ridge {
	fill: var(--color);
  animation: inherit;
	transform-origin: bottom;
}

body.filled .ripple-ridge:first-child {
	animation-name: ripple-ridge-left;
}

body.filled .ripple-ridge:last-child {
	animation-name: ripple-ridge-right;
}

@keyframes ripple-ridge-left {
	5% {
		transform: translateX(20%);
	}
	
	100% {
		transform: translateX(-50vw) scale(3, 0.3);
		visibility: hidden;
	}
}

@keyframes ripple-ridge-right {
	5% {
		transform: translateX(-20%);
	}
	
	100% {
		transform: translateX(50vw) scale(3, 0.3);
		visibility: hidden;
	}
}

.eyedropper-fill {
	fill: var(--color);
	stroke: hsl(0 0% 100% / .6);
}

.eyedropper-cap {
	stroke: hsl(230 60% 55%);
}

.eyedropper {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translate(-50%);
	transition: .25s;
	display: grid;
	grid-template-columns: 1fr;
	align-items: end;
	justify-items: center;
	cursor: pointer;
}

.eyedropper:is(:hover, :focus-visible) {
	outline: none;
	translate: 0 -5px;
}

.eyedropper > * {
    grid-row-start: 1;
    grid-column-start: 1;
}

.eyedropper-loader {
	align-self: stretch;
	justify-self: stretch;
	clip-path: polygon(var(--pipette-polygon));
}

.eyedropper-loader::after {
	content: "";
	position: absolute;
	top: 0;
	width: 100%;
	height: 200%;
	background: repeating-linear-gradient(155deg, red 0 4%, orange 4% 11%, yellow 11% 18%, green 18% 25%, blue 25% 32%, purple 32% 39%, red 39% 42%);
	transition: opacity .25s;
	animation: load 1s linear infinite;
}

body:not(.loading) .eyedropper-loader::after {
	opacity: 0;
}

@keyframes load {
	to {
		translate: 0 -46%;
	}
}

.eyedropper-svg {
  display: block;
	width: auto;
	height: 40vh;
  fill: none;
  stroke: black;
}


.droplet {
	z-index: -1;
  width: 3vh;
	height: calc(var(--i) * 2vh + 4vh);
  background: var(--color, green);
	border-radius: 999px;
  transition: transform ease-out .4s calc(var(--ink-load-time) + var(--delay));
}

.droplet:nth-last-child(1 of .droplet) {
	height: 40vh;
}

body.filled .droplet:nth-last-child(1 of .droplet) {
  transform: translateY(35vh);
	transition-duration: .2s;
}

body.filled .droplet {
  transform: translateY(70vh);
}

body:not(.filled) .droplet {
	transition: none;
}


.bubble {
  position: absolute;
	width: var(--size);
	height: var(--size);
	left: 0;
	top: 0;
	translate: calc(var(--x) * calc(100vw - 100%)) calc(var(--y) * calc(100vh - 100%));
	background-color: var(--color);
	border-radius: 999px;
  animation: float infinite alternate linear 7s var(--delay);
}

@keyframes float {
  to {
    transform: translateY(20px);
  }
}


.intro {
	position: absolute;
	inset: 0;
	display: grid;
	place-content: center;
	pointer-events: none;
}

.intro-content {
	margin-top: 15vh;
	padding: 1em;
	font-size: 1.2rem;
	backdrop-filter: blur(7px);
	background: hsl(39 80% 58% / .5);
	border-radius: 10px;
	color: hsl(39 100% 8%);
	animation: show .25s 3s backwards;
}

@keyframes show {
	from {
		visibility: hidden;
		opacity: 0;
		transform: scale(0);
	}
}

.emoji {
	color: transparent;
	text-shadow: 0 0 0 hsl(39 100% 8%);
}


.no-support {
	display: none;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 1em 0.5em;
	background: red;
	font-size: 1.2rem;
	font-weight: bold;
	text-align: center;
}
</style>
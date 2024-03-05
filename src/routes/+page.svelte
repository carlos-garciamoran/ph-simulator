<script>
  import Console from '$lib/pH-console.svelte'
  import RadioBox from '$lib/radio-box.svelte'
  import Beaker from '$lib/beaker.svelte'
</script>

<div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 size-full p-6 lg:p-10">
  <RadioBox />
  <div class="border p-8 flex justify-center items-center">
    <!-- <h1 class="text-xl">DROPPER AND STUFF GOES HERE</h1> -->
    <Beaker></Beaker>
  </div>
  <Console />
</div>

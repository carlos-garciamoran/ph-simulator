<script lang="ts">
  import Console from '$lib/pH-console.svelte'
  import Menus from '$lib/menus.svelte'
  import Beaker from '$lib/beaker.svelte'
	// import Probe from '@/probe.svelte';
  // import Dropper from '@/dropper.svelte';
</script>

<div class="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 size-full p-6 lg:p-10">
  <Menus />
  <div class="">
      <Beaker />
      <!-- <Dropper />
      <Probe /> -->
  </div>
  <Console />
</div>

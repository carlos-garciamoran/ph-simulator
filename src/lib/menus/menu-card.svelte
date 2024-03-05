<script lang="ts">
  export let title: string;
</script>

<div class="border bg-secondary p-4">
  <h1 class="text-lg mb-4 border-b pb-1">{title}</h1>
  <slot />
</div>
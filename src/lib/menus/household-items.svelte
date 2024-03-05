<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group";
	import RadioItem from "../helpers/radio-item.svelte";
	import MenuCard from "./menu-card.svelte";
  export let value: string;
</script>

<MenuCard title="Household Items">
  <RadioGroup.Root bind:value={value}>
    <RadioItem value="Table Salt" title="Table Salt / Sodium Chloride" />
    <RadioItem value="Baking Soda" title="Baking Soda / Sodium Bicarbonate" />
    <RadioItem value="Hydrogen Peroxide" title="Hydrogen Peroxide, 3% H2O2" />
    <RadioItem value="Drano" title="Drano, containing Sodium Hydroxide" />
    <RadioItem value="Liquid Plumber" title="Liquid Plumber, containing Sulfuric Acid" />
    <RadioItem value="Soft Drink" title="Soft Drink, containing Citric and Carbonic Acids" />
    <RadioItem value="Orange Juice" title="Orange Juice, containing Citric and Ascorbic Acids" />
    <RadioItem value="Milk" title="Milk" />
    <RadioItem value="Dish Soap" title="Dish Soap" />
    <RadioItem value="Blood" title="Blood" />
    <RadioItem value="Battery Acid" title="Battery Acid, containing Sulfuric Acid" />
    <RadioItem value="Ammonia Cleaner" title="Ammonia Cleaner, 2% Ammonium Hydroxide" />
    <RadioItem value="Vinegar" title="Vinegar, 5% Acetic Acid" />
  </RadioGroup.Root>
</MenuCard>
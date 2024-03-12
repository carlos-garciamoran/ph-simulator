<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import RadioItem from "../helpers/radio-item.svelte";
  import MenuCard from "./menu-card.svelte";
  import { phValueStore } from '@/utils/store';

  let value = "8";
  const handleRadioChange = (newValue: string) => {
    const parsedValue = parseFloat(newValue);
    phValueStore.set(parsedValue);
  };
</script>

<MenuCard className="bg-sky-200" title="Household Items">
  <RadioGroup.Root bind:value={value} onValueChange={handleRadioChange}>
    <RadioItem value="7.0" title="Table Salt / Sodium Chloride" />
    <RadioItem value="8.3" title="Baking Soda / Sodium Bicarbonate" />
    <RadioItem value="6.2" title="Hydrogen Peroxide, 3% H2O2" />
    <RadioItem value="12.0" title="Drano, containing Sodium Hydroxide" />
    <RadioItem value="1.0" title="Liquid Plumber, containing Sulfuric Acid" />
    <RadioItem value="3.2" title="Soft Drink, containing Citric and Carbonic Acids" />
    <RadioItem value="3.9" title="Orange Juice, containing Citric and Ascorbic Acids" />
    <RadioItem value="6.8" title="Milk" />
    <RadioItem value="8.7" title="Dish Soap" />
    <RadioItem value="7.4" title="Blood" />
    <RadioItem value="1.0" title="Battery Acid, containing Sulfuric Acid" />
    <RadioItem value="11.6" title="Ammonia Cleaner, 2% Ammonium Hydroxide" />
    <RadioItem value="2.4" title="Vinegar, 5% Acetic Acid" />
  </RadioGroup.Root>
</MenuCard>
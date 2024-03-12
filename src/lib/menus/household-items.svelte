<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group";
  import RadioItem from "../helpers/radio-item.svelte";
  import MenuCard from "./menu-card.svelte";
  import { phValueStore } from '@/utils/store';
  import { householdItemsToPH } from '@/utils/constants';

  let value = "table-salt";

  const handleRadioChange = (newValue: string) => {
    const pHValue = householdItemsToPH[newValue];
    phValueStore.set(pHValue);
  };
</script>

<MenuCard className="bg-sky-200" title="Household Items">
  <RadioGroup.Root bind:value={value} onValueChange={handleRadioChange}>
    <RadioItem value="table-salt" title="Table Salt / Sodium Chloride" />
    <RadioItem value="baking-soda" title="Baking Soda / Sodium Bicarbonate" />
    <RadioItem value="hydrogen-peroxide" title="Hydrogen Peroxide, 3% H2O2" />
    <RadioItem value="drano" title="Drano, containing Sodium Hydroxide" />
    <RadioItem value="liquid-plumber" title="Liquid Plumber, containing Sulfuric Acid" />
    <RadioItem value="soft-drink" title="Soft Drink, containing Citric and Carbonic Acids" />
    <RadioItem value="orange-juice" title="Orange Juice, containing Citric and Ascorbic Acids" />
    <RadioItem value="milk" title="Milk" />
    <RadioItem value="dish-soap" title="Dish Soap" />
    <RadioItem value="blood" title="Blood" />
    <RadioItem value="battery-acid" title="Battery Acid, containing Sulfuric Acid" />
    <RadioItem value="ammonia-cleaner" title="Ammonia Cleaner, 2% Ammonium Hydroxide" />
    <RadioItem value="vinegar" title="Vinegar, 5% Acetic Acid" />
  </RadioGroup.Root>
</MenuCard>
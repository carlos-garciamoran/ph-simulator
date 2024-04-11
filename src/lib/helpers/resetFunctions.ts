import { dropsCounter, totalVolume } from './store';

export function resetDropsAndVolume() {
  dropsCounter.set({ HCl: 0, NaOH: 0 }); // Add any other chemicals as necessary
  totalVolume.set(10); // Resetting to the default volume
}

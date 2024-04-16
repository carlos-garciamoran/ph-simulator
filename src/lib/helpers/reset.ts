import { dropsCounter, sliderIndex, totalVolume } from './store';

export function resetValues() {
	dropsCounter.set({ HCl: 0, NaOH: 0 });
	totalVolume.set(10); // Resetting to the default volume
	sliderIndex.set(0); // Resetting the slider index
}

import { bufferConcentration, dropsCounter, probePosition, sliderIndex, totalDrops, totalVolume } from './store';

export function resetValues() {
	dropsCounter.set({ HCl: 0, NaOH: 0 });
	totalVolume.set(10); // Reset to the default volume
	sliderIndex.set(0); // Reset the slider index
	totalDrops.set(0); // Reset the total number of drops
	bufferConcentration.set({ acid: 0.001, base: 0.001 }); // Reset the buffer concentrations
	probePosition.set(0);
}

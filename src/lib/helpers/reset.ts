import { defaultColor } from './constants';
import {
	bufferConcentration,
	checkedStore,
	phValueStore,
	probePosition,
	sliderIndex,
	totalDrops,
	totalVolume
} from './store';

export function resetValues() {
	totalVolume.set(10); // Reset to the default volume
	sliderIndex.set(0); // Reset the slider index
	totalDrops.set(0); // Reset the total number of drops
	bufferConcentration.set({ acid: 0.001, base: 0.001 }); // Reset the buffer concentrations
	phValueStore.set(NaN);
	probePosition.set(0);
	checkedStore.set(false);
	if (typeof document !== 'undefined') {
		document.documentElement.style.setProperty('--liquid-color', defaultColor);
	}
}

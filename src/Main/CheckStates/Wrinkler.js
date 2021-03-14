import { CMOptions } from '../../Config/VariablesAndData';
import Flash from '../../Disp/Notifications/Flash';
import Notification from '../../Disp/Notifications/Notification';
import PlaySound from '../../Disp/Notifications/Sound';
import { LastWrinklerCount } from '../VariablesAndData';

/**
 * This function checks if any new Wrinklers have popped up
 * It is called by CM.Main.Loop
 */
export default function CheckWrinklerCount() {
	if (Game.elderWrath > 0) {
		let CurrentWrinklers = 0;
		for (const i in Game.wrinklers) {
			if (Game.wrinklers[i].phase === 2) CurrentWrinklers++;
		}
		if (CurrentWrinklers > LastWrinklerCount) {
			LastWrinklerCount = CurrentWrinklers;
			if (CurrentWrinklers === Game.getWrinklersMax() && CMOptions.WrinklerMaxFlash) {
				Flash(3, 'WrinklerMaxFlash');
			} else {
				Flash(3, 'WrinklerFlash');
			}
			if (CurrentWrinklers === Game.getWrinklersMax() && CMOptions.WrinklerMaxSound) {
				PlaySound(CMOptions.WrinklerMaxSoundURL, 'WrinklerMaxSound', 'WrinklerMaxVolume');
			} else {
				PlaySound(CMOptions.WrinklerSoundURL, 'WrinklerSound', 'WrinklerVolume');
			}
			if (CurrentWrinklers === Game.getWrinklersMax() && CMOptions.WrinklerMaxNotification) {
				Notification('WrinklerMaxNotification', 'Maximum Wrinklers Reached', 'You have reached your maximum ammount of wrinklers');
			} else {
				Notification('WrinklerNotification', 'A Wrinkler appeared', 'A new wrinkler has appeared');
			}
		} else {
			LastWrinklerCount = CurrentWrinklers;
		}
	}
}
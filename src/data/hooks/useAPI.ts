import useLocalStorage from "./useLocalStorage";
import { IMidi } from "../../core/interfaces/models/midi.interface";
import { ISaveMidiRequest } from "../../core/interfaces/requests/save-midi-request.interface";
import { ISaveSettingsRequest } from "../../core/interfaces/requests/save-settings-request.interface";
import { ISettings } from "../../core/interfaces/models/settings.interface";
import { MidiList } from "../../core/types/midi-list.type";
import { useMemo } from "react";

export default function useAPI() {
    const { get, set } = useLocalStorage();

    const api = useMemo(() => ({
        midi: {
            list: (): MidiList => (get('@midi-viewer:midis') ?? []) as MidiList,
            show: (id: number): IMidi => api.midi.list()[id],
            store: (request: ISaveMidiRequest): IMidi => {
                const list = api.midi.list();
                const midi = {...request} as IMidi;
                list.push(midi);
                set('@midi-viewer:midis', list);

                return midi;
            },
            update: (id: number, request: ISaveMidiRequest): IMidi => {
                const list = api.midi.list();
                const midi = {...request} as IMidi;
                list[id] = midi;
                set('@midi-viewer:midis', list);
                
                return midi;
            },
            destroy: (id: number): IMidi => {
                const list = api.midi.list();
                const midis = list.splice(id, 1);
                set('@midi-viewer:midis', list);

                return midis[0];
            },
        },
        settings: {
            show: (): ISettings => (get('@midi-viewer:settings') ?? {keyboard: 'piano', colorTheme: 'light'}) as ISettings,
            save: (request: ISaveSettingsRequest): ISettings => {
                const settings = {...request} as ISettings;
                set('@midi-viewer:settings', settings);
                return settings;
            }
        }
    }), [get, set]);

    return { api };
}
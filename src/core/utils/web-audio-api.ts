import Soundfont from 'soundfont-player';
import { INote } from '../interfaces/models/note.interface';

export async function playNote(instrument: Soundfont.Player, note: INote) {
    instrument?.play(
        `${note.key}`, 
        undefined, 
        { duration: (note.endsAt - note.startsAt) / 1000 }
    );
}
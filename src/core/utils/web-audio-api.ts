import Soundfont from 'soundfont-player';
import { INote } from '../interfaces/models/note.interface';
import { getNoteDuration } from './note-utils';

export async function playNote(instrument: Soundfont.Player, note: INote) {
  instrument?.play(
    `${note.index}`, 
    undefined, 
    {
      duration: getNoteDuration(note) / 1000,
      gain: note.velocity / 25
    }
  );
}
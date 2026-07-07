import trackColors from "./track-colors";
import { IMidi } from "../interfaces/models/midi.interface";
import { INote } from "../interfaces/models/note.interface";
import { parseArrayBuffer } from "midi-json-parser";

export function parseMIDIFile(file: File, callback: (midi: IMidi) => void): void {
  const reader = new FileReader();
  reader.onload = (e) => {
    const binaryData = e.target?.result;
    if(binaryData instanceof ArrayBuffer) {
      parseArrayBuffer(binaryData).then(json => {
        let microsecondsPerQuarter = (
          json.tracks[0].find(e => !!e.setTempo)!.setTempo as { microsecondsPerQuarter: number }
        ).microsecondsPerQuarter;

        let programNumber = 0;

        callback({
          name: file.name.replace('.mid', '').replace('.midi', ''),
          division: json.division,
          duration: (
              json.tracks[json.tracks.length - 1].reduce((a, t) => a + t.delta, 0) / json.division
          ) * microsecondsPerQuarter / 1000,
          tempo: Math.round(60000000 / microsecondsPerQuarter),
          tracks: json.tracks.map((track, trackIndex) => {
            const trackPallete = trackColors[trackIndex % trackColors.length];

            const parseTrackNotes = () => {
              let time = 0;
              let allNotes: INote[] = [];
              let notesOn: INote[] = [];

              track.forEach(event => {
                time += (event.delta / json.division) * microsecondsPerQuarter / 1000;
                if(event.programChange) {
                  programNumber = (
                    event.programChange as { programNumber: number }
                  ).programNumber;
                } else if(event.setTempo) {
                  let setTempo = event.setTempo as { microsecondsPerQuarter: number };
                  microsecondsPerQuarter = setTempo.microsecondsPerQuarter;
                } else if(event.noteOn) {
                  let noteOn = event.noteOn as { noteNumber: number; velocity: number };
                  notesOn.push({
                    index: noteOn.noteNumber,
                    instrument: programNumber,
                    startsAt: time,
                    endsAt: 0,
                    velocity: noteOn.velocity,
                    color: [0, 2, 4, 5, 7, 9, 11].includes(noteOn.noteNumber % 12) 
                      ? trackPallete.whiteKey
                      : trackPallete.blackKey,
                    textColor: trackPallete.textColor
                  });
                } else if(event.noteOff) {
                  let noteOff = event.noteOff as { noteNumber: number; velocity: number };
                  let blockIndex = notesOn.findIndex(b => b.index === noteOff.noteNumber);
                  if (blockIndex !== -1) {
                    allNotes.push({ ...notesOn[blockIndex], endsAt: time});
                    notesOn.splice(blockIndex, 1);
                  }
                }
              });

              return allNotes;
            }

            return {
              name: track.find(e => !!e.trackName)?.trackName ?? `Track ${trackIndex + 1}`,
              notes: parseTrackNotes(),
              instrumentIndex: programNumber,
              whiteKeyColor: trackPallete.whiteKey,
              blackKeyColor: trackPallete.blackKey,
              textColor: trackPallete.textColor,
              isMuted: false
            };
          }).filter(t => t.notes.length > 0)
        } as IMidi);
      });
    }
  };

  reader.onerror = (e) => {
    console.error('Error reading file:', e.target?.error);
  };

  reader.readAsArrayBuffer(file);
}
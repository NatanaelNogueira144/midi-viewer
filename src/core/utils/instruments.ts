import accordion from '../../assets/images/instruments/accordion.png';
import acousticBass from '../../assets/images/instruments/acoustic-bass.png';
import agogo from '../../assets/images/instruments/agogo.png';
import applause from '../../assets/images/instruments/applause.png';
import bagpipe from '../../assets/images/instruments/bagpipe.png';
import bandonion from '../../assets/images/instruments/bandonion.png';
import banjo from '../../assets/images/instruments/banjo.png';
import bassoon from '../../assets/images/instruments/bassoon.png';
import birdTweet from '../../assets/images/instruments/bird-tweet.png';
import bottle from '../../assets/images/instruments/bottle.png';
import breathNoise from '../../assets/images/instruments/breath-noise.png';
import celesta from '../../assets/images/instruments/celesta.png';
import cello from '../../assets/images/instruments/cello.png';
import charango from '../../assets/images/instruments/charango.png';
import choir from '../../assets/images/instruments/choir.png';
import clarinet from '../../assets/images/instruments/clarinet.png';
import contrabass from '../../assets/images/instruments/contrabass.png';
import cymbal from '../../assets/images/instruments/cymbal.png';
import dulcimer from '../../assets/images/instruments/dulcimer.png';
import drum from '../../assets/images/instruments/drum.png';
import electricBass from '../../assets/images/instruments/electric-bass.png';
import electricGuitar from '../../assets/images/instruments/electric-guitar.png';
import englishHorn from '../../assets/images/instruments/english-horn.png';
import fiddle from '../../assets/images/instruments/fiddle.png';
import flute from '../../assets/images/instruments/flute.png';
import frenchHorn from '../../assets/images/instruments/french-horn.png';
import glass from '../../assets/images/instruments/glass.png';
import glockenspiel from '../../assets/images/instruments/glockenspiel.png';
import guitar from '../../assets/images/instruments/guitar.png';
import gunshot from '../../assets/images/instruments/gunshot.png';
import harmonica from '../../assets/images/instruments/harmonica.png';
import helicopter from '../../assets/images/instruments/helicopter.png';
import kalimba from '../../assets/images/instruments/kalimba.png';
import koto from '../../assets/images/instruments/koto.png';
import marimba from '../../assets/images/instruments/marimba.png';
import musicBox from '../../assets/images/instruments/music-box.png';
import oboe from '../../assets/images/instruments/oboe.png';
import ocarina from '../../assets/images/instruments/ocarina.png';
import organ from '../../assets/images/instruments/organ.png';
import panFlute from '../../assets/images/instruments/pan-flute.png';
import piano from '../../assets/images/instruments/piano.png';
import piccolo from '../../assets/images/instruments/piccolo.png';
import recorder from '../../assets/images/instruments/recorder.png';
import saxophone from '../../assets/images/instruments/saxophone.png';
import seashore from '../../assets/images/instruments/seashore.png';
import shakuhachi from '../../assets/images/instruments/shakuhachi.png';
import shamisen from '../../assets/images/instruments/shamisen.png';
import shehnai from '../../assets/images/instruments/shehnai.png';
import sitar from '../../assets/images/instruments/sitar.png';
import stringEnsemble from '../../assets/images/instruments/string-ensemble.png';
import synthesizer from '../../assets/images/instruments/synthesizer.png';
import taikoDrum from '../../assets/images/instruments/taiko-drum.png';
import telephoneRing from '../../assets/images/instruments/telephone-ring.png';
import timpani from '../../assets/images/instruments/timpani.png';
import tinkleBell from '../../assets/images/instruments/tinkle-bell.png';
import tom from '../../assets/images/instruments/tom.png';
import trombone from '../../assets/images/instruments/trombone.png';
import trumpet from '../../assets/images/instruments/trumpet.png';
import tuba from '../../assets/images/instruments/tuba.png';
import tubularBells from '../../assets/images/instruments/tubular-bells.png';
import vibraphone from '../../assets/images/instruments/vibraphone.png';
import viola from '../../assets/images/instruments/viola.png';
import violin from '../../assets/images/instruments/violin.png';
import whistle from '../../assets/images/instruments/whistle.png';
import woodblock from '../../assets/images/instruments/woodblock.png';
import xylophone from '../../assets/images/instruments/xylophone.png';

const instruments = [
    { name: 'Acoustic Grand', image: piano },
    { name: 'Bright Acoustic', image: piano },
    { name: 'Electric Grand', image: piano },
    { name: 'Honky-Tonk', image: piano },
    { name: 'Electric Piano 1', image: piano },
    { name: 'Electric Piano 2', image: piano },
    { name: 'Harpsichord', image: piano },
    { name: 'Clavinet', image: piano },
    { name: 'Celesta', image: celesta },
    { name: 'Glockenspiel', image: glockenspiel },
    { name: 'Music Box', image: musicBox },
    { name: 'Vibraphone', image: vibraphone },
    { name: 'Marimba', image: marimba },
    { name: 'Xylophone', image: xylophone },
    { name: 'Tubular Bells', image: tubularBells },
    { name: 'Dulcimer', image: dulcimer },
    { name: 'Drawbar Organ', image: organ },
    { name: 'Percussive Organ', image: organ },
    { name: 'Rock Organ', image: organ },
    { name: 'Church Organ', image: organ },
    { name: 'Reed Organ', image: organ },
    { name: 'Accordion', image: accordion },
    { name: 'Harmonica', image: harmonica },
    { name: 'Bandonion', image: bandonion },
    { name: 'Nylon String Guitar', image: guitar },
    { name: 'Steel String Guitar', image: guitar },
    { name: 'Electric Jazz Guitar', image: electricGuitar },
    { name: 'Electric Clean Guitar', image: electricGuitar },
    { name: 'Electric Muted Guitar', image: electricGuitar },
    { name: 'Overdriven Guitar', image: electricGuitar },
    { name: 'Distortion Guitar', image: electricGuitar },
    { name: 'Guitar Harmonics', image: electricGuitar },
    { name: 'Acoustic Bass', image: acousticBass },
    { name: 'Electric Bass(finger)', image: electricBass },
    { name: 'Electric Bass(pick)', image: electricBass },
    { name: 'Fretless Bass', image: electricBass },
    { name: 'Slap Bass 1', image: electricBass },
    { name: 'Slap Bass 2', image: electricBass },
    { name: 'Synth Bass 1', image: synthesizer },
    { name: 'Synth Bass 2', image: synthesizer },
    { name: 'Violin', image: violin },
    { name: 'Viola', image: viola },
    { name: 'Cello', image: cello },
    { name: 'Contrabass', image: contrabass },
    { name: 'Tremolo Strings', image: cello },
    { name: 'Pizzicato Strings', image: cello },
    { name: 'Orchestral Strings', image: cello },
    { name: 'Timpani', image: timpani },
    { name: 'String Ensemble 1', image: stringEnsemble },
    { name: 'String Ensemble 2', image: stringEnsemble },
    { name: 'SynthStrings 1', image: synthesizer },
    { name: 'SynthStrings 2', image: synthesizer },
    { name: 'Choir Aahs', image: choir },
    { name: 'Voice Oohs', image: choir },
    { name: 'Synth Voice', image: synthesizer },
    { name: 'Orchestra Hit', image: cello },
    { name: 'Trumpet', image: trumpet },
    { name: 'Trombone', image: trombone },
    { name: 'Tuba', image: tuba },
    { name: 'Muted Trumpet', image: trumpet },
    { name: 'French Horn', image: frenchHorn },
    { name: 'Brass Section', image: trumpet },
    { name: 'SynthBrass 1', image: synthesizer },
    { name: 'SynthBrass 2', image: synthesizer },
    { name: 'Soprano Sax', image: saxophone },
    { name: 'Alto Sax', image: saxophone },
    { name: 'Tenor Sax', image: saxophone },
    { name: 'Baritone Sax', image: saxophone },
    { name: 'Oboe', image: oboe },
    { name: 'English Horn', image: englishHorn },
    { name: 'Bassoon', image: bassoon },
    { name: 'Clarinet', image: clarinet },
    { name: 'Piccolo', image: piccolo },
    { name: 'Flute', image: flute },
    { name: 'Recorder', image: recorder },
    { name: 'Pan Flute', image: panFlute },
    { name: 'Blown Bottle', image: bottle },
    { name: 'Shakuhachi', image: shakuhachi },
    { name: 'Whistle', image: whistle },
    { name: 'Ocarina', image: ocarina },
    { name: 'Square Wave', image: synthesizer },
    { name: 'Saw Wave', image: synthesizer },
    { name: 'Syn. Calliope', image: synthesizer },
    { name: 'Chiffer Lead', image: synthesizer },
    { name: 'Charango', image: charango },
    { name: 'Solo Vox', image: organ },
    { name: '5th Saw Wave', image: synthesizer },
    { name: 'Bass& Lead', image: synthesizer },
    { name: 'Fantasia', image: synthesizer },
    { name: 'Warm Pad', image: synthesizer },
    { name: 'Polysynth', image: synthesizer },
    { name: 'Space Voice', image: synthesizer },
    { name: 'Bowed Glass', image: glass },
    { name: 'Metal Pad', image: synthesizer },
    { name: 'Halo Pad', image: synthesizer },
    { name: 'Sweep Pad', image: synthesizer },
    { name: 'Ice Rain', image: synthesizer },
    { name: 'Soundtrack', image: synthesizer },
    { name: 'Crystal', image: synthesizer },
    { name: 'Atmosphere', image: synthesizer },
    { name: 'Brightness', image: synthesizer },
    { name: 'Goblin', image: synthesizer },
    { name: 'Echo Drops', image: synthesizer },
    { name: 'Star Theme', image: synthesizer },
    { name: 'Sitar', image: sitar },
    { name: 'Banjo', image: banjo },
    { name: 'Shamisen', image: shamisen },
    { name: 'Koto', image: koto },
    { name: 'Kalimba', image: kalimba },
    { name: 'Bagpipe', image: bagpipe },
    { name: 'Fiddle', image: fiddle },
    { name: 'Shehnai', image: shehnai },
    { name: 'Tinkle Bell', image: tinkleBell },
    { name: 'Agogo', image: agogo },
    { name: 'Steel Drums', image: drum },
    { name: 'Woodblock', image: woodblock },
    { name: 'Taiko Drum', image: taikoDrum },
    { name: 'Melodic Tom', image: tom },
    { name: 'Synth Drum', image: synthesizer },
    { name: 'Reverse Cymbal', image: cymbal },
    { name: 'Guitar Fret Noise', image: electricGuitar },
    { name: 'Breath Noise', image: breathNoise },
    { name: 'Seashore', image: seashore },
    { name: 'Bird Tweet', image: birdTweet },
    { name: 'Telephone Ring', image: telephoneRing },
    { name: 'Helicopter', image: helicopter },
    { name: 'Applause', image: applause },
    { name: 'Gunshot', image: gunshot }
] as { name: string; image: string; }[];

export default instruments;
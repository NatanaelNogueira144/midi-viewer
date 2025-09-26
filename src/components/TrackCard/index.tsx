import trackColors from "../../core/utils/track-colors";
import {
    ActionsContainer,
    ColorsContainer,
    ColorSelector,
    ColorSquare,
    Container,
    InfoContainer,
    InstrumentImage,
    InstrumentImageWrapper,
    LeftContainer,
    SpeakerSwitch,
    Subtitle,
    Title
} from "./styles";
import { ITrack } from "../../core/interfaces/models/track.interface";
import { ITrackPallete } from "../../core/interfaces/models/track-pallete.interface";
import { useState } from "react";
import instruments from "../../core/utils/instruments";

interface TrackCardProps {
    track: ITrack;
    onColorChange: (trackColor: ITrackPallete) => void;
    onMutedChange: (isMuted: boolean) => void;
}

export default function TrackCard({ onColorChange, onMutedChange, track }: TrackCardProps) {
    const [isSelectingColor, setIsSelectingColor] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    const showColorSelection = (trackColor: ITrackPallete): void => {
        onColorChange(trackColor);
        setIsSelectingColor(false);
    }

    const toggleSound = () => {
        setIsMuted(!isMuted);
        onMutedChange(!isMuted);
    };

    return (
        <Container $bgcolor={track.whiteKeyColor} $textcolor={track.textColor}>
            {isSelectingColor ? (
                <ColorsContainer>
                    {trackColors.map((trackColor, key) => (
                        <ColorSquare 
                            $color={trackColor.whiteKey} 
                            $isSelected={trackColor.whiteKey === track.whiteKeyColor}
                            key={key}
                            onClick={() => showColorSelection(trackColor)} 
                        />
                    ))}
                </ColorsContainer>
            ) : (
                <>
                    <LeftContainer>
                        <InstrumentImageWrapper>
                            <InstrumentImage src={instruments[track.instrumentIndex].image} />
                        </InstrumentImageWrapper>
                        <InfoContainer>
                            <Title>{instruments[track.instrumentIndex].name}</Title>
                            <Subtitle>{track.notes.length} Notes</Subtitle>
                        </InfoContainer>
                    </LeftContainer>
                    <ActionsContainer>
                        <SpeakerSwitch onClick={toggleSound}>{track.isMuted ? '🔇' : '🔊'}</SpeakerSwitch>
                        <ColorSelector 
                            $color={track.whiteKeyColor} 
                            onClick={() => setIsSelectingColor(true)} 
                        />
                    </ActionsContainer>
                </>
            )}
        </Container>
    );
}
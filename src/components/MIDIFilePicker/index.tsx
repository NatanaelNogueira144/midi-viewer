import { DropArea, DropAreaLabel, FileName, HiddenInput, Wrapper } from "./styles";
import { useState, DragEvent, ChangeEvent } from "react";

interface MIDIFilePickerProps {
    onChange: (file: File) => void;
}

export default function MIDIFilePicker(props: MIDIFilePickerProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && (file.name.endsWith(".mid") || file.name.endsWith(".midi"))) {
            setFileName(file.name);
            props.onChange(file);
        } else {
            alert("Please, select a valid MIDI file (.mid or .midi).");
        }
    };

    const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && (file.name.endsWith(".mid") || file.name.endsWith(".midi"))) {
            setFileName(file.name);
            props.onChange(file);
        } else {
            alert("Please, select a valid MIDI file.");
        }
    };

    return (
        <Wrapper>
            <DropAreaLabel htmlFor="midi-input">
                <DropArea
                    $isdragging={isDragging}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {fileName ? (
                        <>
                            ✅ Selected file:
                            <FileName>{fileName}</FileName>
                        </>
                    ) : (
                        <>
                            🎵 Drag and drop a MIDI file here
                            <br /> or click to select
                        </>
                    )}
                </DropArea>
            </DropAreaLabel>
            <HiddenInput
                id="midi-input"
                type="file"
                accept=".mid,.midi"
                onChange={handleFileSelect}
            />
        </Wrapper>
    );
};
import { ColorTheme } from "../../types/color-theme.type";
import { KeyboardSize } from "../../types/keyboard-size.type";

export interface ISaveSettingsRequest {
    keyboardSize: KeyboardSize;
    colorTheme: ColorTheme;
}
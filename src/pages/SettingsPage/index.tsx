import Button from "../../components/Button";
import Layout from "../../components/Layout";
import ThemeContext from "../../data/contexts/ThemeContext";
import dark from "../../styles/themes/dark";
import light from "../../styles/themes/light";
import useAPI from "../../data/hooks/useAPI";
import { ColorTheme } from "../../core/types/color-theme.type";
import { Container, FormWrapper, SelectInput } from "./styles";
import { ISaveSettingsRequest } from "../../core/interfaces/requests/save-settings-request.interface";
import { ISettings } from "../../core/interfaces/models/settings.interface";
import { KeyboardSize } from "../../core/types/keyboard-size.type";
import { useContext, useState } from "react";

export default function SettingsPage() {
    const { api } = useAPI();
    const { setTheme } = useContext(ThemeContext);
    const [request, setRequest] = useState({} as ISaveSettingsRequest);

    const saveSettings = (): void => {
        api.settings.save(request);
        if(request.colorTheme === 'light') {
            setTheme(light);
        } else if(request.colorTheme === 'dark') {
            setTheme(dark);
        }
        alert('Settings were updated successfully!');
    }

    const setToDefault = (): void =>  {
        const defaultValues = { keyboard: 'piano', colorTheme: 'light' } as ISettings;
        setRequest(defaultValues);
        saveSettings();
    }

    return (
        <Layout>
            <Container>
                <FormWrapper>
                    <SelectInput 
                        onChange={(e) => setRequest({...request, keyboard: e.target.value as KeyboardSize})}
                        defaultValue={api.settings.show().keyboard}
                        value={request.keyboard}
                    >
                        <option value="piano">Piano (88 Keys)</option>
                        <option value="large">Large (76 Keys)</option>
                        <option value="medium">Medium (61 Keys)</option>
                        <option value="small">Small (49 Keys)</option>
                    </SelectInput>
                    <SelectInput 
                        onChange={(e) => setRequest({...request, colorTheme: e.target.value as ColorTheme})}
                        defaultValue={api.settings.show().colorTheme}
                        value={request.colorTheme}
                    >
                        <option value="light">Light Theme</option>
                        <option value="dark">Dark Theme</option>
                    </SelectInput>
                    <Button onClick={saveSettings}>Save</Button>
                    <Button onClick={setToDefault}>Set to Default</Button>
                </FormWrapper>
            </Container>
        </Layout>
    );
}
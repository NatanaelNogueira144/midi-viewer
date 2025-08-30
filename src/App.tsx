import './index.css';
import GlobalStyles from './styles/GlobalStyles';
import HomePage from './components/pages/HomePage';
import main from './styles/themes/main';
import { ThemeProvider } from 'styled-components';
import { useEffect } from 'react';

export default function App() {
	useEffect(() => {
		document.title = 'MIDI Viewer';
	}, []);
	
	return (
		<ThemeProvider theme={main}>
			<GlobalStyles />
			<HomePage />
		</ThemeProvider>
	);
}

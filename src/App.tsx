import './index.css';
import GlobalStyles from './styles/GlobalStyles';
import Routes from './routes';
import ThemeContext from './data/contexts/ThemeContext';
import { ThemeProvider } from 'styled-components';
import { useContext, useEffect } from 'react';

export default function App() {
	const { theme } = useContext(ThemeContext);

	useEffect(() => {
		document.title = 'MIDI Viewer';
	}, []);
	
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<Routes />
		</ThemeProvider>
	);
}

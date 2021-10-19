import Main from './components/Main';

import { AuthContextWrapper } from './context/AuthContext';
import {apiConfig} from './config/utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
function App() {
  const theme = createTheme();
  apiConfig();
  return (
    <AuthContextWrapper >
      <ThemeProvider theme={theme}>
        <Main />
      </ThemeProvider>
    </AuthContextWrapper>
  );
}

export default App;
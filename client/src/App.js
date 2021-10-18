import Main from './components/Main';

import { AuthContextWrapper } from './context/AuthContext';
import {apiConfig} from './config/utils';
function App() {
  apiConfig();
  return (
    <AuthContextWrapper >
      <Main />
    </AuthContextWrapper>
  );
}

export default App;
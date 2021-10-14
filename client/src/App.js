import Main from './components/Main';

import { AuthContextWrapper } from './context/AuthContext';
import {config} from './utils';
function App() {
  config();
  return (
    <AuthContextWrapper >
      <Main />
    </AuthContextWrapper>
  );
}

export default App;
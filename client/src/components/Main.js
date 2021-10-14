import { Container } from '@mui/material';
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Login from './Login';

const Main = () => {

  // TODO: Replace for an api call
  return (
    <Container maxWidth="lg">
      <BrowserRouter >
        <Switch>
          <Route exact path="/login">
              <Login/>
          </Route>
          <Route path="/">
            <Login/>
          </Route>
        </Switch>
      </BrowserRouter>
    </Container>
  )
};
export default Main;
import { Container } from '@mui/material';
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import Home from './Home';

const Main = () => {

  // TODO: Replace for an api call
  return (
    <Container maxWidth="lg">
      <BrowserRouter >
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
    </Container>
  )
};
export default Main;
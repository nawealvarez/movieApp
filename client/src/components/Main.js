import { Container } from '@mui/material';
import { Switch, BrowserRouter, Route } from "react-router-dom";
import Login from './Login';
import Signup from './Signup';
import Home from './Home';

const Main = () => {

  return (
    <Container maxWidth="lg">
      <BrowserRouter >
        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
    </Container>
  )
};
export default Main;
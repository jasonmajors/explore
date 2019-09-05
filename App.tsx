import React from "react";
import { createAppContainer } from "react-navigation";
import { AppNavigator } from './utils/AppNavigator';
import { useScreens } from 'react-native-screens';
import { UserContext} from './context/UserContext';

useScreens();
const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  setUser = (user) => {
    this.setState({ user })
  }

  state = {
    user: null,
    setUser: this.setUser
  }

  render() {
    return (
      <UserContext.Provider value={ this.state }>
          <AppContainer />
      </UserContext.Provider>
    )
  }
}

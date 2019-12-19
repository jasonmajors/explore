import React from "react";
import { createAppContainer } from "react-navigation";
import { AppNavigator } from './utils/AppNavigator';
import { useScreens } from 'react-native-screens';
import { UserContext } from './context/UserContext';
import { db } from "./services/firebase";

useScreens();

const AppContainer = createAppContainer(AppNavigator)

export default class App extends React.Component {
  setUser = (user) => {
    // TODO: Move into queris/index
    db.collection('users').doc(user.uid)
      .onSnapshot(user => this.setState({ user: user.data() }))
  }

  setActiveHuntPivotId = (activeHuntPivotId) => {
    this.setState({ activeHuntPivotId })
  }

  state = {
    user: null,
    setUser: this.setUser,
    activeHuntPivotId: null,
    setActiveHuntPivotId: this.setActiveHuntPivotId,
  }

  render() {
    return (
      <UserContext.Provider value={ this.state }>
        <AppContainer />
      </UserContext.Provider>
    )
  }
}

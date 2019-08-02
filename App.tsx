import React from "react";
import { createAppContainer } from "react-navigation";
import { AppNavigator } from './utils/AppNavigator';
import { useScreens } from 'react-native-screens';

useScreens();
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

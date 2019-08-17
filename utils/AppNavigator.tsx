import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import { HomeScreen } from '../components/HomeScreen';
import { DetailsScreen } from "../components/DetailsScreen";
import { ModalScreen } from "../components/ModalScreen";
import { LoginScreen } from "../screens/LoginScreen";
import  { AuthLoadingScreen } from "../screens/AuthLoadingScreen";

const AppStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
)

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: LoginScreen
    }
  },
  {
    headerMode: 'none',
  }
)

export const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoadingScreen,
    },
    App: {
      screen: AppStack,
    },
    Auth: {
      screen: AuthStack
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

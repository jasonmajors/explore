import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import { HomeScreen } from '../components/HomeScreen';
import { DetailsScreen } from "../components/DetailsScreen";
import { ModalScreen } from "../screens/ModalScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { ListingScreen } from "../screens/ListingScreen";
import  { AuthLoadingScreen } from "../screens/AuthLoadingScreen";

const AppStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
    HuntPreviewModal: {
      screen: ModalScreen,
    },
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#323232', // TODO: Need some opacity
        height: 60 // TODO: store in constants somewhere
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
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

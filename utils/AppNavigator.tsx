import { createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from '../components/HomeScreen';
import { ActiveHuntScreen } from "../screens/ActiveHuntScreen";
import { HuntDetailsScreen } from "../screens/HuntDetailsScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { ListingScreen } from "../screens/ListingScreen";
import { TeamSetupScreen } from "../screens/TeamSetupScreen";
import  { AuthLoadingScreen } from "../screens/AuthLoadingScreen";
import HuntCompleted from "../screens/HuntCompleted";

const AppStack = createStackNavigator(
  {
    Home: {
      screen: ListingScreen,
    },
    Details: {
      screen: HuntDetailsScreen,
    },
    TeamSetup: {
      screen: TeamSetupScreen,
    },
    Hunt: {
      screen: ActiveHuntScreen,
    },
    Completed: {
      screen: HuntCompleted,
    }
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

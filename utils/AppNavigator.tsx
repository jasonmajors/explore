import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import { HomeScreen } from '../components/HomeScreen';
import { ActiveHuntScreen } from "../screens/ActiveHuntScreen";
import { HuntDetailsScreen } from "../screens/HuntDetailsScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { ListingScreen } from "../screens/ListingScreen";
import { TeamSetupScreen } from "../screens/TeamSetupScreen";
import  { AuthLoadingScreen } from "../screens/AuthLoadingScreen";
import HuntCompleted from "../screens/HuntCompleted";
import { createDrawerNavigator } from "react-navigation";
import RewardScreen from "../screens/RewardsScreen";

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

const AuthScreens = createSwitchNavigator(
  {
    Login: {
      screen: LoginScreen
    }
  }
)

const RewardStack = createStackNavigator(
  {
    Rewards: {
      screen: RewardScreen
    },
  },
  {
    initialRouteName: "Rewards",
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

const MainNavigator = createSwitchNavigator(
  {
    AuthLoading: {
      screen: AuthLoadingScreen,
    },
    App: AppStack,
    Auth: AuthScreens,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)

export const AppNavigator = createDrawerNavigator(
  {
    Home: MainNavigator,
    Rewards: RewardStack,
  },
  {
    initialRouteName: 'Home'
  }
)

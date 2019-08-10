import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import { HomeScreen } from '../components/HomeScreen';
import { DetailsScreen } from "../components/DetailsScreen";
import { ModalScreen } from "../components/ModalScreen";
import LoginScreen from "../screens/LoginScreen";

const MainStack = createStackNavigator(
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

// TODO: Need to setup defaulting to auth stack if not logged in
export const AppNavigator = createSwitchNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
    Auth: {
      screen: AuthStack
    }
  },
  {
    initialRouteName: 'Auth',
  }
)

// export const AppNavigator = createStackNavigator({
//   Home: {
//     screen: HomeScreen
//   },
//   Details: DetailsScreen,
// },{
//   initialRouteName: 'Home',
//   defaultNavigationOptions: {
//     headerStyle: {
//       backgroundColor: '#f4511e',
//     },
//     headerTintColor: '#fff',
//     headerTitleStyle: {
//       fontWeight: 'bold',
//     },
//   },
// });

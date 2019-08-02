import { createStackNavigator } from "react-navigation";
import { HomeScreen } from '../components/HomeScreen';
import { DetailsScreen } from "../components/DetailsScreen";
import { ModalScreen } from "../components/ModalScreen";

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

export const AppNavigator = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
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

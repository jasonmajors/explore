import React, { useState, useContext, useEffect } from "react"
import { View, Text, SafeAreaView } from "react-native";
import { UserContext } from "../context/UserContext";
import { Icon, Button, ListItem } from "react-native-elements";
import Constants from 'expo-constants';

function RewardScreen(props: any) {
  const context = useContext(UserContext)
  const [rewards, setRewards] = useState([])

  useEffect(() => {
    console.log(context)
    setRewards(context.user.rewards)
  })

  const rewardList = rewards.map((reward, i) => (
      // TODO: Flesh out the display
      <ListItem
        key={i}
        title={ reward.company }
        subtitle={ reward.description }
        bottomDivider
      />
    )
  )

  return (
    <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
      <View style={{ flex: 0.15, alignItems: "center", justifyContent: "center" }}>
        <Text>Here's your stuff</Text>
      </View>
      <View>
        { rewardList }
      </View>
    </SafeAreaView>
  )
}

RewardScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "Your Rewards",
    headerRight: (
      <Button
        type="clear"
        onPress={ () => navigation.toggleDrawer() }
        icon={
          <Icon
            name="menu"
            size={30}
            color="white"
          />
        }
      />
    ),
  }
}

export default RewardScreen

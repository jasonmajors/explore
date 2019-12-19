import React, { useState, useContext, useEffect } from "react"
import { View, Text } from "react-native";
import { UserContext } from "../context/UserContext";
import { Icon, Button } from "react-native-elements";

function RewardScreen(props: any) {
  const context = useContext(UserContext)
  const [rewards, setRewards] = useState([])

  useEffect(() => {
    console.log(context)
    setRewards(context.user.rewards)
  })

  const rewardList = []

  rewards.forEach(reward => {
    rewardList.push(
      // TODO: Flesh out the display
      <Text>{ reward.description }</Text>
    )
  })

  return (
    <View>
      <Text>Here's your stuff</Text>
      { rewardList }
    </View>
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

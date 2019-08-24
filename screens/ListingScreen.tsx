import React from "react";
import { View, Text, ScrollView, Dimensions, Button, ImageBackground } from "react-native";
import { HuntListing } from "../components/HuntListing";

export class ListingScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: "Hunts",
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    ),
  }
  // TODO: We will need this for when we have the nav bar due to react navigation
  // static navigationOptions = {
  //   headerStyle: { marginTop: Constants.statusBarHeight },
  // }

  render() {
    const { height } = Dimensions.get('window');

    return (
      <ScrollView
        pagingEnabled
      >
        <View style={{ backgroundColor: 'blue', height: height - 60 }}>
          <HuntListing
            title="Naples"
            description="Hello it's naples omg so pretty"
            image="https://s3.amazonaws.com/zumpermedia/blog/wp-content/uploads/2018/12/06142608/iStock-1002431174.jpg"
          />
        </View>
        <View style={{ backgroundColor: 'green', height: height - 60 }}>
          <ImageBackground
            source={{ uri: 'https://lbpost.com/hi-lo/wp-content/uploads/2019/02/Bixby-Knolls-.jpg' }}
            style={{ width: '100%', height: '100%' }}
            >
            <Text>Bar</Text>
          </ImageBackground>
        </View>
      </ScrollView>
    );
  }
}

import React from "react";
import { View, Text, ScrollView, Dimensions, Button } from "react-native";
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

  goToNext() : void {
    const { height } = Dimensions.get('window')

    this.refs.scrollView.scrollTo({ x: 0, y: height, animated: true })
  }

  render() {
    return (
      <ScrollView
        ref='scrollView'
        pagingEnabled
      >
        <HuntListing
          title="Naples"
          description="Hello it's naples omg so pretty. Enjoy a nice stroll around Naples and find some dope shit. It'll be so fun!"
          image="https://s3.amazonaws.com/zumpermedia/blog/wp-content/uploads/2018/12/06142608/iStock-1002431174.jpg"
          nextHunt={() => this.goToNext()}
        />
        <HuntListing
          title="Bixby Knolls"
          description="Hello it's bixby omg so pretty. Enjoy a nice stroll around Bix and find some dope shit. It'll be so fun!"
          image="https://lbpost.com/hi-lo/wp-content/uploads/2019/02/Bixby-Knolls-.jpg"
          nextHunt={() => this.goToNext()} // TODO: Wont pass in a pagination prop if it's the last item in the array
        />
      </ScrollView>
    );
  }
}

import React from "react";
import { ScrollView, Dimensions, Button } from "react-native";
import { HuntListing } from "../components/HuntListing";

export class ListingScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: "Hunts",
    headerRight: (
      <Button
        onPress={ () => alert('This is a button!') }
        title="Info"
        color="#fff"
      />
    ),
  }
  // TODO: Temp until setup firebase
  listings : Array<any> = [{
    title: "Naples",
    description: "Hello it's naples omg so pretty. Enjoy a nice stroll around Naples and find some dope shit. It'll be so fun!",
    image: "https://s3.amazonaws.com/zumpermedia/blog/wp-content/uploads/2018/12/06142608/iStock-1002431174.jpg",
    },
    {
      title: "Bixby Knolls",
      description: "Hello it's bixby omg so pretty. Enjoy a nice stroll around Bix and find some dope shit. It'll be so fun!",
      image: "https://lbpost.com/hi-lo/wp-content/uploads/2019/02/Bixby-Knolls-.jpg",
    }
  ]

  getHunts() : Array<any> {
    // TODO: Get the data from the server
    return this.listings
  }

  goToNext() : void {
    const { height } = Dimensions.get('window')

    this.refs.scrollView.scrollTo({ x: 0, y: height, animated: true })
  }

  render() {
    const hunts = []

    this.getHunts().forEach((hunt, index) => {
      hunts.push(
        <HuntListing
          key={ index }
          title={ hunt.title }
          description={ hunt.description }
          image={ hunt.image }
          nextHunt={ () => this.goToNext() }
        />
      )
    })

    return (
      <ScrollView
        ref='scrollView'
        pagingEnabled
      >
        { hunts }
      </ScrollView>
    );
  }
}

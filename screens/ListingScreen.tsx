import React from "react";
import { ScrollView, Dimensions, Button } from "react-native";
import { HuntListing } from "../components/HuntListing";
import { db } from '../utils/firebase';

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

  state = {
    huntListings: []
  }

  componentDidMount() {
    this.getHunts()
  }

  getHunts() {
    db.collection("Hunts")
    .onSnapshot(querySnapshot => {
      querySnapshot.forEach(hunt => {
        this.setState(state => ({
          huntListings: [...state.huntListings, hunt.data()]
        }))
      });
    });
  }

  goToNext() : void {
    const { height } = Dimensions.get('window')

    this.refs.scrollView.scrollTo({ x: 0, y: height, animated: true })
  }

  render() {
    console.log(this.state.huntListings)
    const { huntListings } = this.state
    const hunts = []

    huntListings.forEach((hunt, index) => {
      hunts.push(
        <HuntListing
          key={ index }
          title={ hunt.title }
          description={ hunt.description }
          image={ hunt.image }
          nextHunt={ () => this.goToNext() }
          navigation={ this.props.navigation }
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

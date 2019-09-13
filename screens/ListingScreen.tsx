import React from "react";
import { ScrollView, Dimensions } from "react-native";
import { Button, Icon } from "react-native-elements"
import { HuntListing } from "../components/HuntListing";
import { db } from '../utils/firebase';

export class ListingScreen extends React.Component<any, any> {
  static navigationOptions = {
    title: "Hunts",
    headerRight: (
      <Button
        type="clear"
        onPress={ () => alert('This is a button!') }
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

  state = {
    huntListings: []
  }

  componentDidMount() {
    this.getHunts()
  }

  /**
   * Fetch the hunts from the database
   */
  getHunts() {
    db.collection("Hunts")
    .onSnapshot(querySnapshot => {
      const huntListings = []
      querySnapshot.forEach(hunt => {
        huntListings.push({id: hunt.id, ...hunt.data() })
      })
      this.setState({ huntListings })
    });
  }

  /**
   * Toggles to the next Hunt in the list
   */
  goToNext() : void {
    const { height } = Dimensions.get('window')

    this.refs.scrollView.scrollTo({ x: 0, y: height, animated: true })
  }

  render() {
    const { huntListings } = this.state
    const hunts = []

    huntListings.forEach((hunt, index) => {
      hunts.push(
        <HuntListing
          key={ index }
          huntId={ hunt.id }
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

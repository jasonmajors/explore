import React from "react"
import { Text, View } from "react-native";
import { Button } from "react-native-elements";
import { UserContext } from '../context/UserContext';
import { db } from '../utils/firebase';
import { CreateTeamForm } from '../components/CreateTeamForm';

export class TeamSetupScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null,
  }

  static contextType = UserContext

  state = {
    huntId: this.props.navigation.getParam('huntId', 'INVALID'),
    teams: [],
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    this.queryUsersTeams(this.context.user)
  }

  queryUsersTeams(user) {
    db.collection('teams').where('leader', "==", user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(team => {
          this.setState(state => ({
            teams: [...state.teams, team.data()]
          }))
          // const team = doc.data()
          console.log(team.id, " => ", team.data())
        })
      })
  }

  render() {
    const { teams, modalVisible, huntId } = this.state
    const teamsList = []

    teams.forEach((team, i) => {
      teamsList.push(
        <Text key={ i }>{ team.name }</Text>
      )
    })


    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text>Your teams:</Text>
          { teamsList }
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
            <View style={{ flex: 0.5 }}>
              <Button
                onPress={() => this.props.navigation.popToTop()}
                title="Back to Hunts"
                buttonStyle={{ marginLeft: 10, marginRight: 10 }}
              />
            </View>
            <View style={{ flex: 0.5 }}>
              <Button
                onPress={() => this.setState({ modalVisible: true })}
                title="Create Team"
                buttonStyle={{ marginLeft: 10, marginRight: 10 }}
              />
            </View>
            <View style={{ flex: 0.5 }}>
              <Button
                disabled={true}
                onPress={() => this.setState({ modalVisible: true })}
                title="Join Team"
                buttonStyle={{ marginLeft: 10, marginRight: 10 }}
              />
            </View>
          </View>
        <CreateTeamForm
          huntId={ huntId }
          visible={ modalVisible }
          closeModal={ () => this.setState({ modalVisible: false })}
        />
      </View>
    );
  }
}

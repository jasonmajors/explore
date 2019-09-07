import React from "react"
import { Text, View } from "react-native";
import { UserContext } from '../context/UserContext';
import { db } from '../utils/firebase';

export class TeamSetupScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null,
  }

  static contextType = UserContext

  state = {
    huntId: this.props.navigation.getParam('huntId', 'INVALID'),
    teams: [],
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
    const { teams } = this.state
    console.log(teams)
    const teamsList = []

    teams.forEach((team, i) => {
      teamsList.push(
        <Text key={ i }>{ team.name }</Text>
      )
    })

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        { teamsList }
      </View>
    );
  }
}

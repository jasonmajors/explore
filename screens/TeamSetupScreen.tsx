import React from "react"
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { Button, Avatar } from "react-native-elements";
import { UserContext } from '../context/UserContext';
import { db } from '../services/firebase';
import { CreateTeamForm } from '../components/CreateTeamForm';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * @todo There's a bug where on first registration (not login), this.context.user is not defined
 *       when trying to setup a team for some reason
 */
export class TeamSetupScreen extends React.Component<any, any> {
  static navigationOptions = {
    header: null,
  }

  static contextType = UserContext

  state = {
    huntId: this.props.navigation.getParam('huntId', 'INVALID'),
    huntTitle: this.props.navigation.getParam('huntTitle', 'INVALID'),
    teams: [],
    modalVisible: false,
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  componentDidMount() {
    console.log(this.context)
    const { user } = this.context
    this.queryUsersTeams(user)
  }

  queryUsersTeams(user) {
    // TODO: Change to query hunts_teams_users where userId == user.uid and get all the
    // teamIds
    db.collection('teams').where('leader', "==", user.uid)
      .onSnapshot(querySnapshot => {
        const teams = []
        querySnapshot.forEach(team => {
          teams.push(team.data())
          // const team = doc.data()
          console.log(team.id, " => ", team.data())
        })
        this.setState({ teams })
      })
  }

  navToTeamInvite(teamId) {
    this.props.navigation.navigate("TeamInvite", { teamId })
  }

  render() {
    const { teams, modalVisible, huntId, huntTitle } = this.state
    const teamsList = []

    teams.forEach((team, i) => {
      teamsList.push(
        <View key={ i } style={{
          flexDirection: 'row',
          width: '100%',
          height: 75,
          alignItems: 'center',
          borderColor: 'grey',
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5 }}
        >
          <View style={{ flexDirection: 'row', marginLeft: 20, alignItems: 'center' }}>
            <Avatar rounded icon={{ name: 'home' }} />
            <Text style={{ marginLeft: 25 }}>{ team.name }</Text>
          </View>
        </View>
      )
    })

    return (
      <SafeAreaView style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
        <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ fontSize: 40, color: 'white' }}>Exploring: { huntTitle }</Text>
            <Text style={{ color: 'white' }}>Select one of your teams</Text>
          </LinearGradient>
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            { teamsList }
          </ScrollView>
        </View>
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <View style={{ flex: 0.5 }}>
            <Button
              onPress={() => this.props.navigation.popToTop()}
              title="Back to Hunts"
            />
          </View>
          <View style={{ flex: 0.5 }}>
            <Button
              onPress={() => this.setState({ modalVisible: true })}
              title="Create Team"
            />
          </View>
          <View style={{ flex: 0.5 }}>
            <Button
              disabled={true}
              onPress={() => this.setState({ modalVisible: true })}
              title="Join Team"
            />
          </View>
        </View>
        <CreateTeamForm
          huntId={ huntId }
          visible={ modalVisible }
          closeModal={ () => this.setState({ modalVisible: false })}
          navigation={ this.props.navigation }
        />
      </SafeAreaView>
    );
  }
}

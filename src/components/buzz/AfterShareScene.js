import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {AppInviteDialog} from 'react-native-fbsdk'
import LinearGradient from 'react-native-linear-gradient'
import {Button} from 'react-native-elements'

import Styles from '../Styles'
import Overlay from '../Overlay'
import Points from '../Points'
import { updatePoints } from '../../actions/auth'

class AfterShareScene extends Component {
  getReward() {
    console.log(this.props);
    this.props.updatePoints(this.props.account.userId, ['SHARE']);
    this.props.popScene('buzz');
  }

  render () {
    return (
      <LinearGradient colors={['#ea4d00', '#b80000']} style={[Styles.statusBarContainer, styles.container]}>
        <Overlay style={styles.overlay}>
          <Image source={require('../images/martin_high.png')} style={styles.image}/>
          <Text style={styles.text}>Du erhälst</Text>
          <Points amount={200} textStyle={styles.text} />
          <Text style={styles.text}>für deine Stimme</Text>
          <Button
            backgroundColor='#fff'
            color='#ea4d00'
            borderRadius={30}
            title='MEGA'
            onPress={() => this.getReward()}
          />
        </Overlay>
      </LinearGradient>
    )
  }
}

export default connect(
  state => ({
    account: state.auth.account
  }),
  {updatePoints}
)(AfterShareScene)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ea4d00',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 22,
    padding: 8,
    backgroundColor: 'transparent'
  },
  image: {
    height: 240,
    width: 250,
    marginBottom: 30

  }
})

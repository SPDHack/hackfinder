import React, {PropTypes, Component} from 'react'
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native'
import {SocialIcon} from 'react-native-elements'
import {ShareDialog} from 'react-native-fbsdk';


export default class ShareButtons extends Component {
  render () {
    const {
      postContentURL,
      descriptionText,
      style
    } = this.props;

    return (
      <View style={[styles.container, style]}>
          <SocialIcon style={styles.socialIcon} type='facebook' title='Teilen' button onPress={() => { onPressFacebook(postContentURL, descriptionText, this.props.onShared); } }/>
        <SocialIcon style={styles.socialIcon} type='twitter' title="Tweet" button/>

      </View>
    )
  }
}

function onPressFacebook(postContentURL, descriptionText, cb) {
    var tmp = this;

    var shareLinkContent = {
      contentType: 'link',
      contentUrl: postContentURL,
      contentDescription: descriptionText
    }
    ShareDialog.canShow(shareLinkContent).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      }
    ).then(
      function(result) {
        cb();

        if (result.isCancelled) {
          alert('Share cancelled');
        } else {
          alert('Share success with postId: ' + result.postId);

        }
      },
      function(error) {
        alert('Share fail with error: ' + error);
      }
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  socialIcon: {
    flex: 1
    }
})

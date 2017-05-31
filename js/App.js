
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import { Container, Content, Text, View } from 'native-base';
import Modal from 'react-native-modalbox';

import AppNavigator from './AppNavigator';
import ProgressBar from './components/loaders/ProgressBar';

import theme from './themes/base-theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal1: {
    height: 300,
  },
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showDownloadingModal: false,
      showInstalling: false,
      downloadProgress: 0,
    };
  }

  render() {
    if (this.state.showDownloadingModal) {
      return (
        <Container theme={theme} style={{ backgroundColor: theme.defaultBackgroundColor }}>
          <Content style={styles.container}>
            <Modal
              style={[styles.modal, styles.modal1]}
              backdrop={false}
              ref={(c) => { this._modal = c; }}
              swipeToClose={false}
            >
              <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', padding: 20 }}>
                {this.state.showInstalling ?
                  <Text style={{ color: theme.brandPrimary, textAlign: 'center', marginBottom: 15, fontSize: 15 }}>
                    Installing update...
                  </Text> :
                  <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', padding: 20 }}>
                    <Text style={{ color: theme.brandPrimary, textAlign: 'center', marginBottom: 15, fontSize: 15 }}>
                      Downloading update... {`${parseInt(this.state.downloadProgress, 10)} %`}
                    </Text>
                    <ProgressBar color="theme.brandPrimary" progress={parseInt(this.state.downloadProgress, 10)} />
                  </View>
                }
              </View>
            </Modal>
          </Content>
        </Container>
      );
    }

    return <AppNavigator />;
  }
}

export default App;

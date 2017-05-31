import React, {Component} from 'react';
import {Image, View, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import {Container, Button, H3, Text} from 'native-base';

import {openDrawer} from '../../actions/drawer';
import styles from './styles';

const gdgBg = require('../../../img/gdg-bg.jpg');
const gdgLogo = require('../../../img/gdg-natal.png');

class Home extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
    }

    render() {
        return (
            <Container>
                <StatusBar barStyle='light-content'/>
                <Image source={gdgBg} style={styles.imageContainer}>
                    <View style={styles.logoContainer}>
                        <Image source={gdgLogo} style={styles.logo}/>
                    </View>
                    <View style={{alignItems: 'center', marginBottom: 30, backgroundColor: 'transparent'}}>
                        <View style={{marginTop: 2}}/>
                        <H3 style={styles.text}>Google Developers Group</H3>
                        <View style={{marginTop: 6}}/>
                        <H3 style={styles.text}>Natal</H3>
                    </View>
                    <View style={{marginBottom: 80}}>
                        <Button
                            style={{backgroundColor: '#00A13D', alignSelf: 'center'}}
                            onPress={this.props.openDrawer}
                        >
                            <Text>Entrar</Text>
                        </Button>
                    </View>
                </Image>
            </Container>
        );
    }
}

function bindActions(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    themeState: state.drawer.themeState,
    routes: state.drawer.routes,
});

export default connect(mapStateToProps, bindActions)(Home);

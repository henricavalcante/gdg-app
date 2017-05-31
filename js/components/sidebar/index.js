import React, {Component} from 'react';
import {Image, Platform} from 'react-native';
import {connect} from 'react-redux';
import {
    Content,
    Text,
    List,
    ListItem,
    Icon,
    Container,
    Left,
    Right,
    Badge,
    Button,
    View,
    StyleProvider,
    getTheme,
    variables
} from 'native-base';
import {Actions} from 'react-native-router-flux';

import material from '../../../native-base-theme/variables/material';
import {changePlatform, changeMaterial, closeDrawer} from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import styles from './style';

const gdgBg = require('../../../img/gdg-bg.jpg');

const gdgNatal = require('../../../img/gdg-natal.png');

class SideBar extends Component {

    static propTypes = {
        navigateTo: React.PropTypes.func,
        themeState: React.PropTypes.string,
        changePlatform: React.PropTypes.func,
        changeMaterial: React.PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4,
        };
    }

    navigateTo(route) {
        this.props.navigateTo(route, 'home');
    }

    render() {
        return (
            <Container>
                <Content
                    bounces={false}
                    style={{flex: 1, backgroundColor: '#fff', top: -1}}
                >
                    <Image source={gdgBg} style={styles.drawerCover}>
                        <Image
                            square
                            style={styles.drawerImage}
                            source={gdgNatal}
                        />
                    </Image>
                    <List>

                        <ListItem button noBorder onPress={() => {
                            Actions['members']();
                            this.props.closeDrawer()
                        }}>
                            <Left>
                                <Icon active name="people" style={{color: '#777', fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>Membros</Text>
                            </Left>
                            { this.props.members.length > 0 &&
                            <Right style={{flex: 1}}>
                                <Badge
                                    style={{borderRadius: 3, height: 25, width: 72, backgroundColor: '#29783B'}}
                                >
                                    <Text style={styles.badgeText}>{this.props.members.length}</Text>
                                </Badge>
                            </Right>
                            }
                        </ListItem>
                        <ListItem button noBorder onPress={() => {
                            Actions['events']();
                            this.props.closeDrawer()
                        }}>
                            <Left>
                                <Icon active name="beer" style={{color: '#777', fontSize: 26, width: 30}}/>
                                <Text style={styles.text}>Eventos e Meetups</Text>
                            </Left>
                            { this.props.events.length > 0 &&
                            <Right style={{flex: 1}}>
                                <Badge
                                    style={{borderRadius: 3, height: 25, width: 72, backgroundColor: '#29783B'}}
                                >
                                    <Text style={styles.badgeText}>{this.props.events.length}</Text>
                                </Badge>
                            </Right>
                            }
                        </ListItem>
                    </List>

                </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
        closeDrawer: () => dispatch(closeDrawer()),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    themeState: state.drawer.themeState,
    events: state.event.list,
    members: state.member.list
});

export default connect(mapStateToProps, bindAction)(SideBar);

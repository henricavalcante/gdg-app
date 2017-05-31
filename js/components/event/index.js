import React, {Component} from "react";
import {Linking} from "react-native";
import {connect} from "react-redux";
import {actions} from "react-native-navigation-redux-helpers";
import {Body, Button, Container, Content, Header, Icon, Left, List, ListItem, Right, Text, Title} from "native-base";
import {Actions} from "react-native-router-flux";

import {closeDrawer} from "../../actions/drawer";

import styles from "./styles";

class Event extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        closeDrawer: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
    };
    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => Actions.pop()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>{ this.props.event.name }</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <List>
                        { this.props.event.photo_album && (
                            <ListItem button onPress={() => { Linking.openURL(this.props.event.photo_album) }} >
                                <Body><Text>Galeria de Fotos</Text></Body>
                                <Right><Icon name="images"/></Right>
                            </ListItem>
                        )}
                        { false && (
                            <ListItem button onPress={() => { Actions['attendees'](); this.props.closeDrawer() }} >
                                <Body><Text>Participantes</Text></Body>
                                <Right><Icon name="people"/></Right>
                            </ListItem>
                        )}
                        { this.props.event.schedule && (
                            <ListItem button onPress={() => { Actions['schedule'](); this.props.closeDrawer() }} >
                                <Body><Text>Cronograma</Text></Body>
                                <Right><Icon name="calendar"/></Right>
                            </ListItem>
                        )}
                        { this.props.event.live_stream && (
                            <ListItem button onPress={() => { Linking.openURL(this.props.event.live_stream); this.props.closeDrawer() }} >
                                <Body><Text>Livestream</Text></Body>
                                <Right><Icon name="videocam"/></Right>
                            </ListItem>
                        )}
                        { this.props.event.conduct_code && (
                            <ListItem button onPress={() => { Linking.openURL(this.props.event.conduct_code); this.props.closeDrawer() }} >
                                <Body><Text>Código de Conduta</Text></Body>
                                <Right><Icon name="wine"/></Right>
                            </ListItem>
                        )}
                    </List>
                </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        closeDrawer: () => dispatch(closeDrawer()),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    themeState: state.drawer.themeState,
    event: state.event.selected
});

export default connect(mapStateToProps, bindAction)(Event);

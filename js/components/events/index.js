import React, {Component} from 'react';
import {connect} from 'react-redux';
import {actions} from 'react-native-navigation-redux-helpers';
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    List,
    ListItem,
    Text,
    Thumbnail,
    Left,
    Right,
    Body,
    Item,
    Input,
    Spinner
} from 'native-base';
import {Actions} from 'react-native-router-flux';

import {openDrawer, closeDrawer} from '../../actions/drawer';
import {getEvents, selectEvent} from '../../actions/event';

import styles from './styles';

class Events extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        closeDrawer: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
    };

    componentDidMount() {
        this.props.getEvents();
    }

    _renderSpinner() {
        if (this.props.event.isLoading) {
            return (<Spinner hidden={(this.props.event.isLoading === false)}/>);
        } else {
            return null;
        }
    }

    _renderList() {
        if (this.props.event.list.length) {
            return (<List
                dataArray={this.props.event.list} renderRow={data =>
                <ListItem button onPress={() => {
                    Actions['event']();
                    this.props.selectEvent(data);
                    this.props.closeDrawer();
                }}>
                    <Body>
                    <Text>{data.name}</Text>
                    </Body>
                    <Right>
                        <Icon name="arrow-forward"/>
                    </Right>
                </ListItem>
            }
            />);
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button transparent onPress={this.props.openDrawer}>
                            <Icon name="menu"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Eventos</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    { this._renderSpinner() }
                    { this._renderList() }
                </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: () => dispatch(openDrawer()),
        closeDrawer: () => dispatch(closeDrawer()),
        getEvents: () => dispatch(getEvents()),
        selectEvent: (event) => dispatch(selectEvent(event))
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    themeState: state.drawer.themeState,
    event: state.event
});

export default connect(mapStateToProps, bindAction)(Events);

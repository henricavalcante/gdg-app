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

import {openDrawer, closeDrawer} from '../../actions/drawer';
import {getMembers} from '../../actions/member';

import styles from './styles';

class Members extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        closeDrawer: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),
    };

    componentDidMount() {
        this.props.getMembers();
    }

    _renderSpinner() {
        if (this.props.member.isLoading) {
            return (<Spinner hidden={(this.props.member.isLoading === false)}/>);
        } else {
            return null;
        }
    }

    _renderThumbnail(photo) {
        if (photo) {
            return (<Thumbnail source={{ uri: photo.thumb_link }}></Thumbnail>);
        }
    }

    _renderList() {
        if (this.props.member.list.length) {
            return (<List
                dataArray={this.props.member.list} renderRow={data =>
                <ListItem avatar>
                    <Body>
                        <Text>{data.name}</Text>
                        <Text numberOfLines={1} note>{data.bio}</Text>
                    </Body>
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
                <Header searchBar rounded>
                    <Item>
                        <Icon active name="search"/>
                        <Input placeholder="Pesquisar"/>
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <Content padder>
                    <Button block onPress={this.props.openDrawer}>
                        <Text>Voltar</Text>
                    </Button>
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
        getMembers: () => dispatch(getMembers()),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    themeState: state.drawer.themeState,
    member: state.member
});

export default connect(mapStateToProps, bindAction)(Members);

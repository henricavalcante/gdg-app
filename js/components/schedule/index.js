import React, {Component} from "react";
import {Image} from "react-native";
import {connect} from "react-redux";
import {
    Body,
    Button,
    Card,
    CardItem,
    Container,
    Content,
    Header,
    Icon,
    Left,
    Right,
    Text,
    Thumbnail,
    Title
} from "native-base";
import {Actions} from "react-native-router-flux";

import styles from "./styles";

class Schedule extends Component {

    static propTypes = {
        popRoute: React.PropTypes.func,
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
                    <Title>I/O Extended</Title>
                    </Body>
                    <Right>
                        <Icon name="calendar"></Icon>
                    </Right>
                </Header>

                <Content padder>
                    { this.props.schedule.map(entry => {
                        if (entry.icon) {
                            return (
                                <Card style={styles.mb} key={ entry.title }>
                                    <CardItem style={{height: 70}}>
                                        <Left>
                                            <Icon name={ entry.icon }></Icon>
                                            <Body>
                                            <Text>{ entry.title }</Text>
                                            </Body>
                                        </Left>
                                        <Right>
                                            <Text>{ ("0" + new Date(entry.startAt).getHours()).slice(-2) }:{ ("0" + new Date(entry.startAt).getMinutes()).slice(-2) }</Text>
                                        </Right>
                                    </CardItem>
                                </Card>
                            );
                        } else {
                            return (<Card style={styles.mb} key={ entry.title }>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{uri: entry.photo}}/>
                                        <Body><Text>{ entry.title }</Text><Text note>{ entry.speaker }</Text></Body>
                                    </Left>
                                    <Right>
                                        <Text>{ ("0" + new Date(entry.startAt).getHours()).slice(-2) }:{ ("0" + new Date(entry.startAt).getMinutes()).slice(-2) }</Text>
                                    </Right>
                                </CardItem>

                                <CardItem cardBody>
                                    <Image style={{resizeMode: 'cover', width: null, height: 200, flex: 1}}
                                           source={{uri: entry.background }}/>
                                </CardItem>

                                <CardItem><Body><Text>{ entry.description }</Text></Body></CardItem>

                                <CardItem style={{paddingVertical: 0}}>
                                    <Left>
                                        <Button iconLeft transparent>
                                            <Icon active={ entry.likes !== undefined } name="thumbs-up"/>
                                            <Text> { entry.likes ? Object.keys(entry.likes).length : 0 }</Text>
                                        </Button>
                                    </Left>
                                    <Body>
                                    <Text></Text>
                                    </Body>
                                    <Right>
                                        <Button iconLeft transparent>
                                            <Icon active={ false } name="chatbubbles"/>
                                            <Text> { entry.messages ? Object.keys(entry.messages).length : 0 }</Text>
                                        </Button>
                                    </Right>
                                </CardItem>
                            </Card>);

                        }
                    })}
                </Content>
            </Container>
        );
    }
}

function bindAction() {
    return {};
}

const mapStateToProps = state => {

    const schedule = Object.values(state.event.selected.schedule);

    schedule.sort((a, b) => a.startAt > b.startAt ? 1 : -1);

    return {
        navigation: state.cardNavigation,
        themeState: state.drawer.themeState,
        event: state.event.selected,
        schedule
    }
};

export default connect(mapStateToProps, bindAction)(Schedule);

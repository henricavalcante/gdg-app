const React = require('react-native');

const {StyleSheet, Dimensions, Platform} = React;

const deviceHeight = Dimensions.get('window').height;

export default {
    imageContainer: {
        flex: 1,
        width: null,
        height: null,
    },
    logoContainer: {
        flex: 1,
        marginTop: deviceHeight / 8,
        marginBottom: 30,
    },
    logo: {
        position: 'absolute',
        left: (Platform.OS === 'android') ? 40 : 50,
        top: (Platform.OS === 'android') ? 35 : 60,
        width: 280,
        height: 200,
    },
    text: {
        color: '#000',
        height: 28,
        bottom: 6,
    },
};

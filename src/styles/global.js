const { StyleSheet } = require("react-native");

export default globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        padding: 11,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primary: {
        backgroundColor: '#40b8af',
        color: '#000000',
    }
});
import { COLORS } from "./styleScreen1";

export const SIZES = {
    progressSize: 70,
    progressWidth: 5,
    borderRadius: 15,
};

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.backgraiundNew,
    },
    containerTab: {
        padding: 10,
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white',
    },
    progress: {
        padding: 10,
        backgroundColor: COLORS.containerProject,
        borderRadius: 15,
    },
    itemInput: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 10
    },
    itemInputDate: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 10,
        width: '30%',
    },
    totalDate: {
        backgroundColor: COLORS.containerProgress,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textWhite
    },
    labelInput: {
        color: 'white',
        marginBottom: 10
    },
    dateText: {
        color: 'white',
        marginBottom: 10
    },
    input: {
        height: 40,
        paddingHorizontal: 20,
        borderColor: COLORS.jaune,
        borderWidth: 1,
        borderRadius: 7,
        color: "gray",
    },
    date: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnView: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: COLORS.buttonBorder,
        backgroundColor: COLORS.buttonBackground,
        width: '50%',
        alignItems: 'center',
        height: '8%',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: '5%'
    },
    btnViewText: {
        color: COLORS.text,
    },
    modalView: {
        margin: 20,
        backgroundColor: COLORS.cardBackground,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        width: '60%',
        alignContent: 'center',
        alignSelf: 'center'

    },
    modalAlert: {
        alignItems: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: COLORS.textWhite,
    },
    modalButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    confirmer: {
        backgroundColor: COLORS.accentOrange
    },
    btnTerminerText: {
        color: COLORS.accentOrange,
        fontWeight: '600',
    },
    btnTerminer: {
        width: '40%',
        borderWidth: 2,
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderColor: COLORS.accentOrange,
    },
    containerspinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    inputspinner: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 20,
        width: '80%',
        paddingHorizontal: 10,
    },
});

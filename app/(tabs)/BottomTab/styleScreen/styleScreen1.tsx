export const COLORS = {
    background: '#040618',
    text: 'white',
    subtext: 'gray',
    progressTint: '#C06900',
    progressBackground: '#111111',
    buttonBorder: '#159696',
    buttonBackground: '#159696',
    description: '#778080',

    cardBackground: '#29292B',
    progressTint2: '#ED6E68',

    textWhite: '#fff',
    textGray: 'gray',
    accentOrange: '#C06900',
    accentTeal: '#159696',
    containerProgress: '#02030E',
    containerProject: '#010209',
    borderProject: '#1B1B1E',
    jaune: '#FFD80A',
    backgraiundNew: "#040618"

};

import { StyleSheet, View, Text, ScrollView } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#040618',
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: COLORS.containerProgress,
        borderRadius: 15,
        height: 100,
    },
    nodata: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#191919',
        borderRadius: 15,
        marginTop: 10
    },
    ItemProgress: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    ItemNumber: {
        borderBottomWidth: 2,
        marginBottom: 5,
    },
    number: {
        fontSize: 30,
        fontWeight: '600',
        color: '#fff',
    },
    label: {
        fontSize: 10,
        fontWeight: '600',
        color: 'gray',
    },
    projet: {
        marginTop: 20,
        padding: 20,
        borderRadius: 15,
        backgroundColor: COLORS.containerProject,
    },
    Itemprojet: {
        borderBottomWidth: 2,
        paddingBottom: 10,
        marginBottom: 15,
        flexDirection: 'row',
        borderBottomColor: COLORS.borderProject
    },
    CercleProgress: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    circularProgress: {
        backgroundColor: 'transparent'
    },
    TextProgress: {
        color: "white",
    },
    descriptionProgress: {
        width: '65%',
    },
    containerName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    name: {
        color: '#fff',
        fontSize: 18,
    },
    status: {
        width: 60,
        fontWeight: '900',
        borderWidth: 2,
        paddingVertical: 4,
        paddingHorizontal: 6,
        borderRadius: 10,
        fontSize: 12,
    },
    encours: {
        color: '#C06900',
        borderColor: '#C06900',
    },
    finie: {
        color: '#1A5C41',
        borderColor: '#1A5C41',
    },
    desc: {
        color: '#778080',
        marginBottom: 10,
    },
    descText: {
        color: '#778080',
    },
    btnContainer: {
        flexDirection: 'row',
        width: '70%',
        alignSelf: 'flex-end',
        // backgroundColor: 'red',
        justifyContent: 'space-between'
    },
    btnVoire: {
        //marginLeft: 5,
        marginVertical: 5,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: COLORS.buttonBorder,
        backgroundColor: COLORS.buttonBackground,
        width: '45%',
        alignItems: 'center',
        height: 30,
        justifyContent: 'center',
        // alignItems: 'flex-end',
        alignSelf: 'flex-end'
    },
    btnSup: {
        //marginLeft: 5,
        marginVertical: 5,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: COLORS.accentOrange,
        backgroundColor: COLORS.accentOrange,
        width: '45%',
        alignItems: 'center',
        height: 30,
        justifyContent: 'center',
        // alignItems: 'flex-end',
        alignSelf: 'flex-end'
    },
    btnVoireText: {
        fontWeight: '700',
        // borderBottomWidth: 2,
        borderColor: '#295ba9',
        color: '#fff',
        fontSize: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: COLORS.cardBackground,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',

    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: COLORS.textWhite,
    },
    modalButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    confirmer: {
        backgroundColor: COLORS.accentOrange
    },
    annuler: {
        backgroundColor: COLORS.accentTeal
    },
});
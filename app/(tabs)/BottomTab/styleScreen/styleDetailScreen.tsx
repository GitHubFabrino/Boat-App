import { StyleSheet } from "react-native";
import { COLORS } from "./styleScreen1";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.background,
    },
    containerimage: {
        // flex: 1,
        width: 300,
        height: 400,

        backgroundColor: COLORS.textWhite,
    },
    contentContainer: {
        paddingVertical: 10,
    },
    containerTab: {
        paddingTop: 15,
        backgroundColor: COLORS.containerProgress,
    },
    btnAdd: {
        backgroundColor: COLORS.accentTeal,
        padding: 3,
        width: '20%',
        alignItems: 'center',

        borderRadius: 25

    },
    btnAddText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 12
    },
    btnAddImage: {
        backgroundColor: COLORS.accentTeal,
        padding: 5,
        borderRadius: 5,
        marginBottom: 10,
        marginTop: 5
    },
    containerMateriel: {
        backgroundColor: COLORS.cardBackground,
        width: '100%',
        borderRadius: 5,
        padding: 10,
        margin: 5,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    containerImage: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        height: 100,

    },
    buttonImage: {
        backgroundColor: COLORS.containerProject,
        padding: 10,
        borderColor: COLORS.containerProgress,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonTextImage: {
        color: "white",
        fontSize: 15,
        fontWeight: "bold",
    },
    containerSup: {
        // backgroundColor: 'red',
        margin: 10,
        marginBottom: 20,
        alignSelf: 'flex-end'
    },
    Containerimage: {
        width: '100%',
        height: 250,
        // backgroundColor: 'red'
    },
    ContainerDim: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: COLORS.containerProject,
        paddingVertical: 2
    },
    ContainerItem: {
        width: '45%',
        padding: 5
    },
    ContainerDimIteme: {
        // width: '20%',
        margin: 5,
        padding: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: COLORS.containerProgress
    },
    image: {
        width: '100%',
        height: '100%'
    },
    containerMateriaux: {
        backgroundColor: COLORS.cardBackground,
        width: '100%',
        borderRadius: 5
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textWhite,
        marginBottom: 20,
    },
    titleProject: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textWhite,
        marginBottom: 20,
    },
    progress: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: COLORS.containerProgress,
        borderRadius: 15,
        height: 100,
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
        color: COLORS.textWhite,
    },
    day: {
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 6,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 5,
        borderLeftColor: COLORS.accentOrange,
        width: 100,
    },
    dayDateContainer: {
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 6,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 5,
        borderLeftColor: COLORS.accentTeal,
        width: 100,
    },
    dayReste: {
        fontSize: 30,
        color: COLORS.textWhite,
        fontWeight: '600',
    },
    dayDate: {
        fontSize: 15,
        color: COLORS.textWhite,
        fontWeight: '600',
    },
    dayTextDate: {
        fontSize: 12,
        color: COLORS.textGray,
        fontWeight: '600',
    },
    dayText: {
        color: COLORS.textGray,
        fontWeight: '600',
    },
    btnView: {
        backgroundColor: COLORS.accentOrange,
        width: 40,
        padding: 2,
        borderRadius: 3,
        marginBottom: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnDessin: {
        backgroundColor: COLORS.accentTeal,
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        width: '50%',
        marginBottom: 20,
    },
    btnViewDessinText: {
        color: COLORS.textWhite,
        fontWeight: '600',
    },
    containerDesc: {
        backgroundColor: COLORS.containerProgress,
        padding: 10,
        marginVertical: 20,
        borderRadius: 5,
    },
    textDesc: {
        color: COLORS.textWhite,
        fontWeight: '600',

    },
    containerTache: {
        backgroundColor: COLORS.containerProject,
        paddingHorizontal: 10,
        // padding: 50,
        paddingVertical: 10,
        marginVertical: 10,
        marginBottom: 35,
        borderRadius: 5,
        // height: 250
    },
    tabContentContainer: {
        backgroundColor: COLORS.backgraiundNew,
        height: '100%'
    },
    dimText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        padding: 20
    },
    dimTextItem: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',

    },

    containerTacheTitre: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20

    },
    btnSee: {
        paddingHorizontal: 5,
    },
    containerTacheTitreText: {
        color: COLORS.textWhite,
        fontSize: 15,
        fontWeight: '600',
    },
    containerTacheTitreTextsub: {
        color: 'gray',
        fontSize: 12,
        fontWeight: '600',
        padding: 5
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // marginTop: 10,
        // backgroundColor: 'green'
    },
    tacheDesc: {
        color: COLORS.textGray,
        marginLeft: 30,
    },
    tachepers: {
        color: COLORS.textGray,
        marginLeft: 10,
        paddingVertical: 5
    },
    date: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'red'
    },
    btnCommencer: {
        width: '40%',
        borderWidth: 2,
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderColor: COLORS.accentTeal,
    },
    btnCommencerText: {
        color: COLORS.accentTeal,
        fontWeight: '600',
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
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 10,
        marginTop: 70,
        backgroundColor: COLORS.cardBackground,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',

    },
    modalView3D: {
        margin: 10,
        marginTop: 70,
        backgroundColor: COLORS.cardBackground,
        // borderRadius: 20,
        // padding: 5,
        alignItems: 'center',

    },
    modalViewDetail: {
        margin: 10,
        marginTop: 50,
        backgroundColor: COLORS.cardBackground,
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',

    },
    modalAlert: {
        alignItems: 'center',
        justifyContent: 'center'
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
        marginTop: 10
    },
    confirmer: {
        backgroundColor: COLORS.accentOrange
    },
    annuler: {
        backgroundColor: COLORS.accentTeal
    },
    inProgressText: {
        color: COLORS.accentTeal,
        marginTop: 5,
        fontStyle: 'italic',
    },
    inComplededText: {
        color: COLORS.accentOrange,
        marginTop: 5,
        fontStyle: 'italic',
    },
    itemInput: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 10
    },
    labelInput: {
        color: 'white',
        marginBottom: 10
    },
    input: {
        height: 40,
        paddingHorizontal: 20,
        borderColor: "#FF9001",
        borderWidth: 1,
        borderRadius: 7,
        color: "gray",
    },

    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
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
        backgroundColor: COLORS.background,
    },
    containerTab: {
        padding: 10,
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        color: COLORS.text,
    },
    subtext: {
        color: COLORS.subtext,
        fontWeight: 'bold',
        borderBottomWidth: 3,
        borderBottomColor: COLORS.progressTint,
        paddingBottom: 10,
    },
    contentContainer: {
        paddingVertical: 20,
    },
    project: {
        marginTop: 20,
        padding: 20,
        borderRadius: SIZES.borderRadius,
        backgroundColor: COLORS.containerProject,
    },
    projectItem: {
        borderBottomWidth: 2,
        paddingBottom: 10,
        marginBottom: 15,
        flexDirection: 'row',
        borderBottomColor: 'gray'
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
        color: COLORS.text,
        fontSize: 18,
    },
    desc: {
        marginBottom: 15,
    },
    descText: {
        color: COLORS.description,
    },
    btnView: {
        marginLeft: 5,
        marginVertical: 5,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: COLORS.buttonBorder,
        backgroundColor: COLORS.buttonBackground,
        width: 80,
        alignItems: 'center',
        height: 30,
        justifyContent: 'center',
    },
    btnViewText: {
        color: COLORS.text,
    },
    circleProgress: {
        width: '35%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    circularProgress: {
        backgroundColor: 'transparent'
    },
    textProgress: {
        color: COLORS.text,
    },
    dateProject: {
        alignItems: 'center',
    },
    date: {
        marginTop: 5,
        color: COLORS.subtext,
        fontSize: 12,
    },
    dateDetail: {
        color: COLORS.text,
        fontWeight: '600',
    },
    Itemprojet: {
        borderBottomWidth: 2,
        paddingBottom: 10,
        marginBottom: 15,
        flexDirection: 'row',
    },
    CercleProgress: {
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    TextProgress: {
        color: "white",
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
    btnVoire: {
        marginLeft: 5,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: '#159696',
        backgroundColor: '#159696',
        width: 80,
        alignItems: 'center',
        height: 30,
        justifyContent: 'center',
    },
    btnVoireText: {
        color: "#fff",
    },
});

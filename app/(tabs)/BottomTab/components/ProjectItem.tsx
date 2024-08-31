import React, { useState } from 'react';
import { View, Text, Button, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CircularProgress } from 'react-native-circular-progress';
import { ThemedText } from '@/components/ThemedText';
import { Project } from '../Project.Interface';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { COLORS, styles } from '../styleScreen/styleScreen1';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store/store';
import { removeProject } from '@/store/projectSlice';
import Icon from '@expo/vector-icons/Ionicons';


interface ProjectItemProps {
    project: Project;
}
type ProjectDetailScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'ProjectDetail'>;

const ProjectItem1: React.FC<ProjectItemProps> = ({ project }) => {
    const navigation = useNavigation<ProjectDetailScreenNavigationProp['navigation']>();

    const [modalVisible, setModalVisible] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const handleDeleteProject = (projectId: number) => {
        dispatch(removeProject(projectId));
    };
    return (
        <View style={styles.Itemprojet}>
            <View style={styles.CercleProgress}>
                <CircularProgress

                    size={70}
                    width={5}
                    fill={project.progress}
                    tintColor={project.status == 'Encours' ? "#C06900" : "#1A5C41"}
                    backgroundColor={COLORS.background}
                >
                    {() => <Text style={styles.TextProgress}>{project.progress}%</Text>}
                </CircularProgress>
            </View>
            <View style={styles.descriptionProgress}>
                <View style={styles.containerName}>
                    <ThemedText type='defaultSemiBold' style={styles.name}>{project.name}</ThemedText>
                    <Text style={[styles.status, project.status === "Encours" ? styles.encours : styles.finie]}>
                        {project.status}
                    </Text>
                </View>
                <View style={styles.desc}>
                    <Text style={styles.descText}>{project.description}</Text>
                </View>
                <View style={styles.btnContainer}>
                    <View style={styles.btnVoire}>
                        <Text
                            style={styles.btnVoireText}
                            onPress={() => navigation.navigate('ProjectDetail', { ...project })}
                        >
                            VOIRE
                        </Text>
                    </View>
                    <View style={styles.btnSup}>

                        <Icon name="trash" onPress={() => setModalVisible(true)} color={COLORS.textWhite} size={15} />

                    </View>

                </View>

            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Voulez vous supprimer le projet</Text>
                        <View style={styles.modalButtons}>
                            <Button title="ANNULER" onPress={() => setModalVisible(false)} color={COLORS.accentTeal} />
                            <Button title="SUPPRIMER" onPress={() => handleDeleteProject(project.id)} color={COLORS.accentOrange} />

                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ProjectItem1;

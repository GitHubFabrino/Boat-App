
import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Modal, TextInput } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { starkTaskToDb, completeTaskToDb } from '@/store/projectSlice';
import { AppDispatch, RootState } from '@/store/store';
import { PropsProject, Taches } from '../Project.Interface';
import { styles } from '../styleScreen/styleDetailScreen';
import { COLORS } from '../styleScreen/styleScreen1';

const Tache: React.FC<PropsProject> = ({ projectId }) => {
    const project = useSelector((state: RootState) => state.projects.projects.find(proj => proj.id === projectId))

    return (
        <ScrollView contentContainerStyle={styles.tabContentContainer}>
            {project?.tache.map((task, index) => (
                <TacheItem tache={task} key={task.id} Idproject={projectId} index={index} />
            ))}
        </ScrollView>
    )
}

export default Tache

interface TacheProps {
    tache: Taches
    Idproject: number
    index: number
}
const TacheItem: React.FC<TacheProps> = ({ tache, Idproject, index }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isCompleted, setIsCompleted] = useState(tache.statusEnd);
    const [isInProgress, setIsInProgress] = useState(tache.statusStart);
    const [modalVisible, setModalVisible] = useState(false);
    const [detail, setDetail] = useState(false);
    const [modalAlertVisible, setModalAlertVisible] = useState(false);
    const [username, setUsername] = useState("");

    const [actionType, setActionType] = useState<'start' | 'complete'>('start');

    const handleStartTask = () => {
        dispatch(starkTaskToDb(Idproject, tache.id, username));
        setIsInProgress(1);
        setModalVisible(false);
        console.log("apres : ", tache);
    };

    const handleCompleteTask = () => {
        dispatch(completeTaskToDb(Idproject, tache.id));
        setIsCompleted(1);
        setIsInProgress(0);
        setModalVisible(false);
    };

    const openModal = (type: 'start' | 'complete') => {

        setActionType(type);
        setModalVisible(true);
    };

    const openModalAlert = (type: 'start' | 'complete') => {
        setModalAlertVisible(true);
        setActionType(type);
    };

    const openDetail = () => {
        setDetail(!detail)
    };
    const data = tache.personne
    return (

        <ScrollView contentContainerStyle={styles.tabContentContainer}>
            <View style={styles.containerTab}>
                <View style={styles.containerTache}>

                    <Pressable onPress={() => openDetail()} >
                        <View style={styles.containerTacheTitre}>
                            <Text style={styles.containerTacheTitreText}>{index + 1} - {tache.titre}</Text>
                            <Icon name={isCompleted ? "checkbox" : "checkbox-outline"} color={COLORS.accentOrange} size={20} />
                        </View>
                    </Pressable>


                    <View>
                        <Text style={styles.tacheDesc}>{tache.description}</Text>
                        {detail && <View style={styles.tacheDesc}>
                            <Text style={styles.tachepers}> Efféctuer par : </Text>
                            {tache.personne.map((person, index) => (<Text style={styles.tachepers} key={index}>{person.nom + ' ' + person.prenom} </Text>))}
                            <View style={styles.tachepers}>
                                {tache.dateStart && <Text style={styles.inProgressText}>Débuté le : {tache.dateStart}</Text>}
                                {tache.dateEnd && <Text style={styles.inComplededText}>Términer le : {tache.dateEnd}</Text>}
                            </View>

                        </View>}
                        {!detail && <View style={styles.date}>
                            <View>
                                {isInProgress ? (<Text style={styles.inProgressText}>En cours...</Text>) : (<Text style={styles.inComplededText}></Text>)}
                                {/* {isCompleted && <Text style={styles.inComplededText}>Términer</Text>} */}
                                {isCompleted ? (<Text style={styles.inComplededText}>Términer</Text>) : (<Text style={styles.inComplededText}></Text>)}

                            </View>
                            <View>
                                {isInProgress ? <Text style={styles.inProgressText}>{tache.dateStart}</Text> : ''}
                                {isCompleted ? <Text style={styles.inComplededText}>{tache.dateEnd}</Text> : ''}
                            </View>
                        </View>
                        }
                        <View style={styles.btnContainer}>
                            <Pressable style={styles.btnCommencer} onPress={() => {
                                if (isInProgress || isCompleted) {
                                    openModalAlert('start')
                                } else {
                                    openModal('start')
                                }
                            }
                            } >
                                <Text style={styles.btnCommencerText}>COMMENCER</Text>
                            </Pressable>
                            <Pressable style={styles.btnTerminer} onPress={() => {
                                if (!isInProgress || isCompleted) {
                                    openModalAlert('complete')
                                } else {
                                    openModal('complete');
                                }
                            }}>
                                <Text style={styles.btnTerminerText}>TERMINER</Text>
                            </Pressable>
                        </View>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}

                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                {actionType === 'start' ?
                                    <View>
                                        <Text style={styles.modalText}> Pour commencer la tache entrer le nom :  </Text>
                                        <View style={styles.itemInput}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Nom de l'excetutant "
                                                value={username}
                                                onChangeText={setUsername}
                                                autoCorrect={false}
                                                autoCapitalize="none"
                                            />
                                        </View>
                                        <View style={styles.modalButtons}>

                                            <Pressable style={styles.btnCommencer} onPress={() => setModalVisible(false)}
                                            >
                                                <Text style={styles.btnCommencerText}>ANNULER</Text>
                                            </Pressable>

                                            <Pressable style={styles.btnTerminer} onPress={handleStartTask}>
                                                <Text style={styles.btnTerminerText}>CONFIRMER</Text>
                                            </Pressable>

                                        </View>


                                    </View>
                                    :
                                    <View>
                                        <Text style={styles.modalText}>Confirmez-vous la fin de cette tâche?</Text>
                                        <View style={styles.modalButtons}>

                                            <Pressable style={styles.btnCommencer} onPress={() => setModalVisible(false)}
                                            >
                                                <Text style={styles.btnCommencerText}>ANNULER</Text>
                                            </Pressable>

                                            <Pressable style={styles.btnTerminer} onPress={handleCompleteTask}>
                                                <Text style={styles.btnTerminerText}>CONFIRMER</Text>
                                            </Pressable>

                                        </View>
                                    </View>}

                            </View>
                        </View>
                    </Modal>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalAlertVisible}
                        onRequestClose={() => {
                            setModalAlertVisible(!modalAlertVisible);
                        }}

                    >
                        <View style={styles.modalView}>
                            <View style={styles.modalAlert}>
                                <Text style={styles.modalText}>
                                    La tâche est déjà {actionType === 'start' ? "commencer" : "terminer"} !!!
                                </Text>
                                <View style={styles.modalButtons}>

                                    <Pressable style={styles.btnTerminer} onPress={() => setModalAlertVisible(false)}>
                                        <Text style={styles.btnTerminerText}>OK</Text>
                                    </Pressable>

                                </View>
                            </View>

                        </View>
                    </Modal>
                </View>

            </View>
        </ScrollView>




    )
}
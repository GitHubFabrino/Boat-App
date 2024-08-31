import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Modal, Button, TextInput, Image } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import { useDispatch, useSelector } from 'react-redux';
// import { COLORS, styles } from './styleDetailScreen';
import { startTask, completeTask, ajouterMateriel, ajouterMateriaux, addMateriauxToDb, removeMateriaux, addMateriauxImageToDb } from '@/store/projectSlice';

import { AppDispatch, RootState } from '@/store/store';
import { Materiaux, Materiel, PropsProject, Taches } from '../Project.Interface';
import { styles } from '../styleScreen/styleDetailScreen';

import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import { COLORS } from '../styleScreen/styleScreen1';
import * as ImagePicker from 'expo-image-picker';

const MateriauxScreen: React.FC<PropsProject> = ({ projectId }) => {
    const dispatch = useDispatch<AppDispatch>(); const project = useSelector((state: RootState) => state.projects.projects.find(proj => proj.id === projectId))
    const [modalVisible, setModalVisible] = useState(false);
    const [nomMateriaux, setNomMateriaux] = useState('');
    const [nbMateriaux, setNbMateriaux] = useState('');
    const [selectedImage, setSelectedImage] = useState<string | undefined>();
    const auth = useSelector((state: RootState) => state.auth);



    const openImagePicker = async () => {
        // Demander les permissions si ce n'est pas déjà accordé
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Désolé, nous avons besoin des permissions pour accéder à vos photos !');
            return;
        }

        // Options de sélection d'image
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Pour sélectionner uniquement des images
            quality: 1, // Qualité maximale
            allowsEditing: true, // Permet d'éditer l'image avant de la sélectionner
            aspect: [4, 3], // Ratio de l'image
            base64: false, // Ne pas inclure les données en base64
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri); // Utilisez `result.assets` pour accéder aux images
        }
    };

    const addMateriaux = () => {
        const dataMateriel = {
            id: 0,
            nomMateriaux: nomMateriaux,
            nombreMateriaux: nbMateriaux,
            imageMateriaux: selectedImage,
            projectId: auth.id
        }
        dispatch(addMateriauxToDb(projectId, dataMateriel));
        setModalVisible(false)

    };


    return (
        <ScrollView contentContainerStyle={styles.tabContentContainer}>
            <View style={styles.containerTab}>
                <Pressable style={styles.btnAdd} onPress={() => setModalVisible(true)}>
                    <Text style={styles.btnAddText}>Ajouter</Text>
                </Pressable>
                <ScrollView contentContainerStyle={styles.tabContentContainer}>

                    {project?.materiaux.map((m, index) => (
                        <MateriauxItem materiaux={m} Idproject={projectId} index={index} key={m.id} />
                    ))}
                </ScrollView>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Ajouter un nouveau materiaux</Text>
                            <View style={styles.itemInput}>
                                <Text style={styles.labelInput}>Nom</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Entrer son nom"
                                    value={nomMateriaux}
                                    onChangeText={setNomMateriaux}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                />
                            </View>
                            <View style={styles.itemInput}>
                                <Text style={styles.labelInput}>Nombre</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Entrez le nombre"
                                    value={nbMateriaux}
                                    onChangeText={setNbMateriaux}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                />
                            </View>
                            {selectedImage && (
                                <Image
                                    source={{ uri: selectedImage }}
                                    style={{ width: 100, height: 100 }}
                                    resizeMode="contain"
                                />
                            )}
                            {/* <Button title="Choisir une image" onPress={openImagePicker} /> */}
                            <Pressable
                                style={styles.buttonImage}
                                onPress={openImagePicker}
                            >
                                <Text style={styles.buttonTextImage}>Choisir une image</Text>
                            </Pressable>
                            <View style={styles.modalButtons}>
                                <Button title="ANNULER" onPress={() => setModalVisible(false)} color={COLORS.accentTeal} />
                                <Button title="AJOUTER" onPress={addMateriaux} color={COLORS.accentOrange} />

                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>

    )
}

export default MateriauxScreen

interface MateriauxProps {
    materiaux: Materiaux
    Idproject: number
    index: number
}

const MateriauxItem: React.FC<MateriauxProps> = ({ materiaux, Idproject, index }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [isImageVisible, setIsImageVisible] = useState<{ [key: number]: boolean }>({});
    const [selectedImage, setSelectedImage] = useState<string | undefined>(materiaux.imageMateriaux);
    const [selectedImageAdd, setSelectedImageAdd] = useState<string | undefined>();
    const [modaleAddImage, setmodaleAddImage] = useState(false);
    const toggleImageVisibility = (index: number) => {
        setIsImageVisible(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const auth = useSelector((state: RootState) => state.auth);

    console.log("Materiel verification : ", materiaux);
    const [nombre, setnombre] = useState('');



    const handleDeleteProject = (idMateriaux: number) => {
        console.log("Id materiaux delete interface : ", idMateriaux);

        if (auth.id) {
            dispatch(removeMateriaux(idMateriaux, Idproject, auth.id));
            //dispatch(supprimerMateriel({ projectId: Idproject, idMateriel: idMateriel }))
        }
    };


    const openImagePicker = async () => {
        // Demander les permissions si ce n'est pas déjà accordé
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Désolé, nous avons besoin des permissions pour accéder à vos photos !');
            return;
        }

        // Options de sélection d'image
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Pour sélectionner uniquement des images
            quality: 1, // Qualité maximale
            allowsEditing: true, // Permet d'éditer l'image avant de la sélectionner
            aspect: [4, 3], // Ratio de l'image
            base64: false, // Ne pas inclure les données en base64
        });

        if (!result.canceled) {
            setSelectedImageAdd(result.assets[0].uri); // Utilisez `result.assets` pour accéder aux images
        }
    };

    const addMaterielImage = () => {
        if (nombre) {
            const dataMateriaux = {
                id: materiaux.id,
                nomMateriaux: materiaux.nomMateriaux,
                nombreMateriaux: nombre,
                imageMateriaux: selectedImageAdd,
                projectId: auth.id
            }
            setSelectedImage(selectedImageAdd)

            console.log("Add Image :", dataMateriaux);

            if (auth.id && Idproject) {
                dispatch(addMateriauxImageToDb(materiaux.id, dataMateriaux));

            }
            setmodaleAddImage(false)

        } else {
            const dataMateriaux = {
                id: materiaux.id,
                nomMateriaux: materiaux.nomMateriaux,
                nombreMateriaux: materiaux.nombreMateriaux,
                imageMateriaux: selectedImageAdd,
                projectId: auth.id
            }
            setSelectedImage(selectedImageAdd)

            console.log("Add Image :", dataMateriaux);

            if (auth.id && Idproject) {
                dispatch(addMateriauxImageToDb(materiaux.id, dataMateriaux));

            }
            setmodaleAddImage(false)

        }

    };

    const [ModalAlert, setModalAlert] = useState(false);



    return (

        <View style={styles.containerTab}>

            <View style={styles.containerMateriel}>
                <Pressable style={styles.btnSee} onPress={() => toggleImageVisibility(index)}>

                    <View style={styles.containerTacheTitre}>
                        <View>
                            <Text style={styles.containerTacheTitreText}>{materiaux.nomMateriaux}</Text>
                            <Text style={styles.containerTacheTitreTextsub}>Nombre : {nombre || materiaux.nombreMateriaux}</Text>
                        </View>

                        <Icon name={isImageVisible[index] ? "arrow-up-circle" : "arrow-down-circle"} color={COLORS.accentOrange} size={20} />


                    </View>
                </Pressable>
                {isImageVisible[index] && (
                    <View style={styles.containerImage}>
                        {selectedImage ? (<Image
                            source={{ uri: selectedImage }}
                            style={styles.image}
                            resizeMode="contain"
                        />) : (<Pressable
                            style={styles.buttonImage}
                            onPress={() => setmodaleAddImage(true)}
                        >
                            <Text style={styles.buttonTextImage}>Choisir une image</Text>
                        </Pressable>)}
                        <View style={styles.containerSup}>
                            <Icon name="trash" color={COLORS.accentOrange} size={20} onPress={() => setModalAlert(true)} />
                        </View>
                    </View>
                )}
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={ModalAlert}
                onRequestClose={() => setModalAlert(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Voulez vous supprimer cet Materiaux</Text>
                        <View style={styles.modalButtons}>
                            <Button title="ANNULER" onPress={() => setModalAlert(false)} color={COLORS.accentTeal} />
                            <Button title="SUPPRIMER" onPress={() => handleDeleteProject(materiaux.id)} color={COLORS.accentOrange} />

                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modaleAddImage}
                onRequestClose={() => setmodaleAddImage(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalViewDetail}>

                        <View style={styles.itemInput}>
                            <Text style={styles.labelInput}>Nombre</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Entrer le nombre"
                                value={nombre}
                                onChangeText={setnombre}
                                autoCorrect={false}
                                autoCapitalize="none"
                            />
                        </View>
                        <Text style={styles.modalText}>Ajouter un nouveau Image</Text>

                        {selectedImageAdd && (
                            <Image
                                source={{ uri: selectedImageAdd }}
                                style={{ width: 100, height: 100 }}
                                resizeMode="contain"
                            />
                        )}

                        <Pressable
                            style={styles.buttonImage}
                            onPress={openImagePicker}
                        >
                            <Text style={styles.buttonTextImage}>Choisir une image</Text>
                        </Pressable>
                        <View style={styles.modalButtons}>
                            <Pressable style={styles.btnCommencer} onPress={() => setmodaleAddImage(false)}
                            >
                                <Text style={styles.btnCommencerText}>ANNULER</Text>
                            </Pressable>

                            <Pressable style={styles.btnTerminer} onPress={addMaterielImage}>
                                <Text style={styles.btnTerminerText}>AJOUTER</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>


        </View>

    );
};

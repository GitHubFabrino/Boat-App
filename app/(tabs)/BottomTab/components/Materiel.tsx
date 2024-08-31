import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Modal, Button, TextInput, Image } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store';
import { Materiel, PropsProject, Taches } from '../Project.Interface';
import { styles } from '../styleScreen/styleDetailScreen';
import { MediaType, launchImageLibrary } from 'react-native-image-picker';
import { COLORS } from '../styleScreen/styleScreen1';
import { addMaterielImageToDb, addMaterielToDb, ajouterMateriel, removeMateriel, supprimerMateriel } from '@/store/projectSlice';
import * as ImagePicker from 'expo-image-picker';

const Materielle: React.FC<PropsProject> = ({ projectId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const project = useSelector((state: RootState) => state.projects.projects.find(proj => proj.id === projectId))
    const [modalVisible, setModalVisible] = useState(false);
    const [nomMateriel, setNomMateriel] = useState('');
    const [nbMateriel, setNbMateriel] = useState('');
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

    const addMateriel = () => {
        const dataMateriel = {
            nomMateriel: nomMateriel,
            nombreMateriel: nbMateriel,
            imageMateriel: selectedImage,
            projectId: auth.id
        }
        if (auth.id && projectId) {
            dispatch(addMaterielToDb(projectId, dataMateriel));

        }
        setModalVisible(false)

    };

    console.log("Project complete : ", project);

    return (
        <ScrollView contentContainerStyle={styles.tabContentContainer}>
            <View style={styles.containerTab}>
                <Pressable style={styles.btnAdd} onPress={() => setModalVisible(true)}>
                    <Text style={styles.btnAddText}>Ajouter</Text>
                </Pressable>
                <ScrollView contentContainerStyle={styles.tabContentContainer}>

                    {project?.materiel.map((m, index) => (
                        <MaterialItem materiel={m} Idproject={projectId} key={m.id} index={index} />
                    ))}
                </ScrollView>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalViewDetail}>
                            <Text style={styles.modalText}>Ajouter un nouveau materiel</Text>
                            <View style={styles.itemInput}>
                                <Text style={styles.labelInput}>Nom</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Entrer son nom"
                                    value={nomMateriel}
                                    onChangeText={setNomMateriel}
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                />
                            </View>
                            <View style={styles.itemInput}>
                                <Text style={styles.labelInput}>Nombre</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Entrez le nombre"
                                    value={nbMateriel}
                                    onChangeText={setNbMateriel}
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

                            <Pressable
                                style={styles.buttonImage}
                                onPress={openImagePicker}
                            >
                                <Text style={styles.buttonTextImage}>Choisir une image</Text>
                            </Pressable>
                            <View style={styles.modalButtons}>
                                <Pressable style={styles.btnCommencer} onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.btnCommencerText}>ANNULER</Text>
                                </Pressable>

                                <Pressable style={styles.btnTerminer} onPress={addMateriel}>
                                    <Text style={styles.btnTerminerText}>AJOUTER</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>

    )
}

export default Materielle
interface MaterielProps {
    materiel: Materiel
    Idproject: number
    index: number
}

const MaterialItem: React.FC<MaterielProps> = ({ materiel, Idproject, index }) => {

    const dispatch = useDispatch<AppDispatch>();
    const [isImageVisible, setIsImageVisible] = useState<{ [key: number]: boolean }>({});
    const [selectedImage, setSelectedImage] = useState<string | undefined>(materiel.imageMateriel);
    const [selectedImageAdd, setSelectedImageAdd] = useState<string | undefined>();
    const [modaleAddImage, setmodaleAddImage] = useState(false);
    const [nombre, setnombre] = useState('');

    const toggleImageVisibility = (index: number) => {
        setIsImageVisible(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const auth = useSelector((state: RootState) => state.auth);

    console.log("Materiel verification : ", materiel);


    const handleDeleteProject = (idMateriel: number) => {
        console.log("Id materiel delete interface : ", idMateriel);

        if (auth.id) {
            dispatch(removeMateriel(idMateriel, Idproject, auth.id));
            //dispatch(supprimerMateriel({ projectId: Idproject, idMateriel: idMateriel }))
        }
    };


    // const openImagePicker = () => {
    //     const options: {
    //         mediaType: MediaType;
    //         includeBase64: boolean;
    //         maxHeight: number;
    //         maxWidth: number;
    //     } = {
    //         mediaType: 'photo',
    //         includeBase64: false,
    //         maxHeight: 2000,
    //         maxWidth: 2000,
    //     };

    //     launchImageLibrary(options, (response) => {
    //         if (response.didCancel) {
    //             console.log('User cancelled image picker');
    //         } else if (response.errorCode) {
    //             console.log('Image picker error: ', response.errorMessage);
    //         } else if (response.assets && response.assets.length > 0) {
    //             const imageUri = response.assets[0].uri;
    //             if (imageUri) {
    //                 setSelectedImageAdd(imageUri);
    //             }
    //         }
    //     });


    // };




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

        // console.log("---------------", typeof (nombre));

        if (nombre) {
            console.log("AAAAAAAAAAATTTTTTTTTTTTTTooooooooooo");

            const dataMateriel = {
                id: materiel.id,
                nomMateriel: materiel.nomMateriel,
                nombreMateriel: nombre,
                imageMateriel: selectedImageAdd,
                projectId: auth.id
            }
            setSelectedImage(selectedImageAdd)
            setnombre(nombre)

            console.log("Add Image :", dataMateriel);

            if (auth.id && Idproject) {
                dispatch(addMaterielImageToDb(materiel.id, dataMateriel));

            }
            setmodaleAddImage(false)
        } else {
            console.log("AAAAAAAAAAATTTTTTTTTTTTTTyyyyyyyyyyy");
            const dataMateriel = {
                id: materiel.id,
                nomMateriel: materiel.nomMateriel,
                nombreMateriel: materiel.nombreMateriel,
                imageMateriel: selectedImageAdd,
                projectId: auth.id
            }
            setSelectedImage(selectedImageAdd)

            console.log("Add Image :", dataMateriel);

            if (auth.id && Idproject) {
                dispatch(addMaterielImageToDb(materiel.id, dataMateriel));

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
                            <Text style={styles.containerTacheTitreText}>{materiel.nomMateriel}</Text>
                            <Text style={styles.containerTacheTitreTextsub}>Nombre : {nombre || materiel.nombreMateriel}</Text>
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
                        <Text style={styles.modalText}>Voulez vous supprimer cet Materiel</Text>
                        <View style={styles.modalButtons}>
                            <Button title="ANNULER" onPress={() => setModalAlert(false)} color={COLORS.accentTeal} />
                            <Button title="SUPPRIMER" onPress={() => handleDeleteProject(materiel.id)} color={COLORS.accentOrange} />

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
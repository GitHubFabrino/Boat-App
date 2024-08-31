
import { StyleSheet, View, Text, TextInput, Pressable, Image, ScrollView, Modal, Button } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import React, { useState, createElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../BottomTab/styleScreen/styleScreen1';
import Icon from '@expo/vector-icons/Ionicons';
import { AppDispatch, RootState } from '@/store/store';
import { insertEquipeToDb, loadEquipe, removeEquipe } from '@/store/equipeSlice';
import { Equipe } from '../BottomTab/Project.Interface';

import * as ImagePicker from 'expo-image-picker';

export default function TeamScreen() {

  const [nameNew, setNameNew] = useState<string>("");
  const [lastnameNew, setLastnameNew] = useState<string>("");
  const [posteNew, setPosteNew] = useState<string>('');
  const [selectedImageNew, setSelectedImageNew] = useState<string>();


  const [modalVisible, setModalVisible] = useState(false)

  //const dispatch = useDispatch();
  const equipe = useSelector((state: RootState) => state.equipe.equipe);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  console.log("EQUIPE SUR SCREEN TEAM", equipe);
  const ajouterMembre = () => {
    if (auth.id && selectedImageNew) {
      const newequipe: Equipe = {
        id: new Date().getMilliseconds(),
        nom: nameNew,
        prenom: lastnameNew,
        poste: posteNew,
        userId: auth.id,
        photo: selectedImageNew
      }
      dispatch(insertEquipeToDb(newequipe));
      console.log("EQUIPE ADD : ", equipe);

    }
    setModalVisible(false)
  }


  useEffect(() => {

    if (auth.id) {
      dispatch(loadEquipe(auth.id));
    } else {
    }
  }, [dispatch]);



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
      setSelectedImageNew(result.assets[0].uri); // Utilisez `result.assets` pour accéder aux images
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.containerTab}>
        <Text style={styles.text}>Liste de l'équipe</Text>
        <Pressable onPress={() => setModalVisible(true)} style={styles.btnView}>
          <Text style={styles.btnViewText}>Ajouter</Text>
        </Pressable>
      </View>
      <Text style={styles.personne}>{equipe?.length} Personnes</Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {equipe?.map((eq, index) => (
          <EquipeItem equipe={eq} key={index} />
        ))}

      </ScrollView>

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

            <View>
              <Text style={styles.modalText}>Remplire le formulaire</Text>

              <View style={styles.itemInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Nom "
                  value={nameNew}
                  onChangeText={setNameNew}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.itemInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Prénom"
                  value={lastnameNew}
                  onChangeText={setLastnameNew}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.itemInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Poste"
                  value={posteNew}
                  onChangeText={setPosteNew}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>
              {selectedImageNew &&
                <Image
                  source={{ uri: selectedImageNew }}
                  style={styles.image}
                  resizeMode="contain"
                />

              }
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

                <Pressable style={styles.btnTerminer} onPress={ajouterMembre}>
                  <Text style={styles.btnTerminerText}>AJOUTER</Text>
                </Pressable>

              </View>


            </View>


          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

interface EquipeItemProps {
  equipe: Equipe
}

const EquipeItem: React.FC<EquipeItemProps> = ({ equipe }) => {
  const [ModalAlert, setModalAlert] = useState(false);
  const [ModalVisibleImage, setModalVisibleImage] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleDeleteEquipe = (id: number) => {
    dispatch(removeEquipe(id));
    setModalAlert(false)
  };

  return (
    <View style={styles.progress} >

      <Pressable onPress={() => setModalVisibleImage(true)}>
        <View style={styles.icon}>
          <Icon name="person-circle-sharp" color={COLORS.accentOrange} size={40} />
          <Text style={styles.containerdate}>{equipe.poste}</Text>
        </View>
      </Pressable>

      <View style={styles.desc}>
        <Text style={styles.containerTacheTitreText}>{equipe.nom}</Text>
        <Text style={styles.containerTacheTitreTextsub}>{equipe.prenom}</Text>
      </View>

      <View style={styles.btnSup}>

        <Icon name="trash" onPress={() => setModalAlert(true)} color={COLORS.textWhite} size={15} />

      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalAlert}
        onRequestClose={() => setModalAlert(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Voulez vous supprimer cet personne</Text>
            <View style={styles.modalButtons}>
              <Button title="ANNULER" onPress={() => setModalAlert(false)} color={COLORS.accentTeal} />
              <Button title="SUPPRIMER" onPress={() => handleDeleteEquipe(equipe.id)} color={COLORS.accentOrange} />

            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={ModalVisibleImage}
        onRequestClose={() => setModalVisibleImage(false)}
      >
        <Pressable onPress={() => setModalVisibleImage(false)} style={styles.centeredViewImage}>
          <View style={styles.modalViewImage}>
            {equipe.photo &&
              <Image
                source={{ uri: equipe.photo }}
                style={styles.imageContainer}
                resizeMode="contain"
              />

            }
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

interface MyWebDatePickerProps {
  date: string;
  setDate: (date: string) => void;
}

const MyWebDatePicker: React.FC<MyWebDatePickerProps> = ({ date, setDate }) => {
  return createElement('input', {
    type: 'date',
    value: date,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      setDate(event.target.value);
    },
    style: {
      height: 40,
      paddingHorizontal: 20,
      borderColor: "#FF9001",
      borderWidth: 1,
      borderRadius: 7,
      color: "gray",
      backgroundColor: '#191919',
      paddingLeft: 10,
      paddingRight: 10
    }
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#111111',
  },
  containerTab: {
    padding: 10,
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
  },
  progress: {
    padding: 10,
    backgroundColor: '#191919',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 5
  },
  icon: {
    width: '100%'
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

  },
  containerdate: {
    color: 'gray',
    fontSize: 10,
    fontWeight: '500',
  },
  desc: {
    width: '60%'
  },
  itemInput: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10
  },
  image: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    // borderRadius: 80
  },
  btnSup: {
    //marginLeft: 5,
    marginVertical: 5,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: COLORS.accentOrange,
    backgroundColor: COLORS.accentOrange,
    width: '20%',
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'flex-end'
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
  itemInputDate: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
    width: '45%',
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
    width: '30%',
    alignItems: 'center',
    padding: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '5%'
  },
  btnViewText: {
    color: COLORS.text,
  },
  personne: {
    color: COLORS.textWhite,
    fontWeight: 'bold'
  },
  contentContainer: {
    paddingVertical: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  centeredViewImage: {
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

    elevation: 5,
  },
  modalViewImage: {
    // width: '80%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    elevation: 5,
  },
  imageContainer: {
    width: 200,
    height: 200
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
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10
  },
  btnCommencerText: {
    color: COLORS.accentTeal,
    fontWeight: '600',
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
});

function deleteEquipe(arg0: { id: any; }): any {
  throw new Error('Function not implemented.');
}


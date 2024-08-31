import { StyleSheet, View, Text, TextInput, Pressable, ScrollView, Modal, Image } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import React, { useState, createElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS } from '../BottomTab/styleScreen/styleScreen1';
import Icon from '@expo/vector-icons/Ionicons';
import { AppDispatch, RootState } from '@/store/store';

const logo = require('../../../assets/images/user1.jpeg')
import { User } from '../BottomTab/Project.Interface';
import { modifierUser } from '@/store/authSlice';
import * as ImagePicker from 'expo-image-picker';
export default function SettingScreen() {
  const [name, setName] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [identifiant, setIdentifiant] = useState<string>('');


  const [modalVisible, setModalVisible] = useState(false)

  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector((state: RootState) => state.profile.profile);
  const auth = useSelector((state: RootState) => state.auth);

  const [selectedImage, setSelectedImage] = useState<string>();
  useEffect(() => {
    if (auth.nomUser && auth.prenomUser && auth.emailUser && auth.photo) {
      setName(auth.nomUser)
      setLastname(auth.prenomUser)
      setIdentifiant(auth.emailUser)
      setSelectedImage(auth.photo)
    }
  }, [auth]);
  console.log("USERS : ", users);
  console.log("AUTH : ", auth);

  const { id, nomUser, prenomUser, emailUser, passwordUser, photo } = auth

  const ajouterMembre = () => {

    if (id && nomUser && prenomUser && emailUser && passwordUser && selectedImage) {
      const userData: User = {
        id: id,
        nomUser: name,
        prenomUser: lastname,
        emailUser: identifiant,
        passwordUser: passwordUser,
        photo: selectedImage
      }

      dispatch(modifierUser(id, userData))
    }
    setModalVisible(false)
  }

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




  return (
    <ThemedView style={styles.container}>
      <View style={styles.containerTab}>
        <Text style={styles.text}>Profile d'utilisateur</Text>
        <Pressable onPress={() => setModalVisible(true)} style={styles.btnView}>
          <Text style={styles.btnViewText}>Modifier <Icon name="pencil-outline" color={COLORS.textWhite} size={10} /></Text>

        </Pressable>
      </View>

      <View>
        {selectedImage ? (
          <Image
            source={{ uri: selectedImage }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : <Image source={logo} style={styles.image} resizeMode="contain" />
        }
      </View>


      <View style={styles.progress}>

        <View style={styles.progress}>
          <Text style={styles.containerTacheTitreTextsub}>Nom</Text>
          <Text style={styles.containerTacheTitreText}>{nomUser}</Text>
        </View>
        <View style={styles.progress}>
          <Text style={styles.containerTacheTitreTextsub}>Prénom</Text>
          <Text style={styles.containerTacheTitreText}>{prenomUser}</Text>
        </View>

        <View style={styles.progress}>
          <Text style={styles.containerTacheTitreTextsub}>Identifiant</Text>
          <Text style={styles.containerTacheTitreText}>{emailUser}</Text>
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

            <View>
              {selectedImage ? (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.image}
                  resizeMode="contain"
                />
              ) : <Image source={logo} style={styles.image} resizeMode="contain" />
              }
              <Text style={styles.modalText}>Remplire le formulaire</Text>

              <View style={styles.itemInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Nom "
                  value={name}
                  onChangeText={setName}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.itemInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Prénom"
                  value={lastname}
                  onChangeText={setLastname}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.itemInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Identifiant"
                  value={identifiant}
                  onChangeText={setIdentifiant}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
              </View>

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
    marginTop: 5

  },
  icon: {
    width: '15%'
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
  itemInput: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10
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
  image: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    borderRadius: 80,
    backgroundColor: "white"
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
  modalView: {
    margin: 20,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',

    elevation: 5,
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


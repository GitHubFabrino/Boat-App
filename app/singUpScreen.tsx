import { insertUserDb } from "@/store/projectSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "./(tabs)/BottomTab/styleScreen/styleScreen1";
const logo = require("../assets/images/user1.jpeg");
import { UserToDb } from "./(tabs)/BottomTab/Project.Interface";
import * as ImagePicker from 'expo-image-picker';

export default function SingUpScreen() {

  const dispatch = useDispatch<AppDispatch>();
  const [nomUser, setNomUser] = useState("");
  const [prenomUser, setPrenomUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [passwordUser, setPasswordUser] = useState("");
  const [passwordUserConfirm, setPasswordUserConfirm] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>();

  const [modalVisible, setmodalVisible] = useState(false);

  function inscription() {
    if (passwordUser === passwordUserConfirm) {
      if (selectedImage) {
        const dataInscription: UserToDb = {
          nomUser: nomUser,
          prenomUser: prenomUser,
          emailUser: emailUser,
          passwordUser: passwordUser,
          photo: selectedImage
        }

        dispatch(insertUserDb(dataInscription));
        setNomUser('')
        setPrenomUser('')
        setEmailUser('')
        setPasswordUser('')
        setPasswordUserConfirm('')
        setmodalVisible(true)
      } else {
        const dataInscription: UserToDb = {
          nomUser: nomUser,
          prenomUser: prenomUser,
          emailUser: emailUser,
          passwordUser: passwordUser,
          photo: ''
        }

        dispatch(insertUserDb(dataInscription));
        setNomUser('')
        setPrenomUser('')
        setEmailUser('')
        setPasswordUser('')
        setPasswordUserConfirm('')
        setmodalVisible(true)
      }

    }

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

    <SafeAreaView style={styles.container}>
      {selectedImage ? (
        <Image
          source={{ uri: selectedImage }}
          style={styles.image}
          resizeMode="contain"
        />
      ) : <Image source={logo} style={styles.image} resizeMode="contain" />
      }
      <Text style={styles.title}>CREER UN COMPTE</Text>
      <View style={styles.inputView}>
        <Text style={styles.labelInput}>Nom</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom "
          value={nomUser}
          onChangeText={setNomUser}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Text style={styles.labelInput}>Prénom</Text>
        <TextInput
          style={styles.input}
          placeholder="Prénom "
          value={prenomUser}
          onChangeText={setPrenomUser}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Text style={styles.labelInput}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={emailUser}
          onChangeText={setEmailUser}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Text style={styles.labelInput}>MOT DE PASSE</Text>
        <TextInput
          style={styles.input}
          placeholder="MOT DE PASSE"
          secureTextEntry
          value={passwordUser}
          onChangeText={setPasswordUser}
          autoCorrect={false}
          autoCapitalize="none"
        />
        <Text style={styles.labelInput}>CONFIRMATION DE MOT DE PASSE</Text>
        <TextInput
          style={styles.input}
          placeholder="CONFIRMATION DE MOT DE PASSE"
          secureTextEntry
          value={passwordUserConfirm}
          onChangeText={setPasswordUserConfirm}
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
      <View style={styles.buttonView}>

        <Pressable
          style={styles.button}
          onPress={() => inscription()}
        >
          <Text style={styles.buttonText}>S'INSCRIRE</Text>
        </Pressable>



      </View>

      <Text style={styles.footerText}>
        J'ai déjà un compte ?<Text style={styles.signup}>
          <Link href="/" asChild>

            <Text> Se connecter</Text>

          </Link></Text>
      </Text>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setmodalVisible(!modalVisible);
        }}

      >
        <View style={styles.modalView}>
          <View style={styles.modalAlert}>
            <Text style={styles.modalText}>
              Inscription reussi !!!
            </Text>
            <View style={styles.modalButtons}>

              <Pressable style={styles.btnTerminer} >
                <Text style={styles.btnTerminerText}><Link href="/" asChild onPress={() => setmodalVisible(false)}><Text>OK</Text></Link></Text>
              </Pressable>

            </View>
          </View>

        </View>
      </Modal>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
    // backgroundColor: "#0C0C0F",
    backgroundColor: COLORS.backgraiundNew,

    justifyContent: "center",
  },
  tabContentContainer: {
    backgroundColor: COLORS.backgraiundNew,
    // flex: 1
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 80
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 20,
    color: "#FF9001",
  },
  inputView: {
    // gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  labelInput: {
    color: 'white',
    marginBottom: 5
    // backgroundColor: 'red'
  },
  input: {
    height: 40,
    paddingHorizontal: 20,
    borderColor: "#FF9001",
    borderWidth: 1,
    borderRadius: 7,
    color: "white",
    // backgroundColor: 'green',
    marginBottom: 10
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8,
    color: "white",
  },
  switch: {
    flexDirection: "row",
    gap: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rememberText: {
    fontSize: 13,
    color: "white",
    paddingLeft: 5,
  },
  forgetText: {
    fontSize: 11,
    color: "#FF9001",
  },
  button: {
    backgroundColor: "#FF9001",
    height: 45,
    borderColor: "#FF9001",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
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
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
    marginVertical: 20
  },
  optionsText: {
    textAlign: "center",
    paddingVertical: 10,
    color: "#FF9001",
    fontSize: 13,
    marginBottom: 6,
  },
  mediaIcons: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23,
  },
  icons: {
    width: 40,
    height: 40,
  },
  footerText: {
    textAlign: "center",
    color: "white",
  },
  signup: {
    color: "#FF9001",
    fontSize: 13,
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
    width: '60%',
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
    width: '100%',
    borderWidth: 2,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: COLORS.accentOrange,
  },
  ok: {
    color: COLORS.textWhite,
    fontWeight: 'bold'
  }
});

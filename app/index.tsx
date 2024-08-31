import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
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
import { RootStackParamList } from "./(tabs)/BottomTab/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loadAllUser } from "@/store/profileSlice";
import { login } from "@/store/authSlice";
import { COLORS } from "./(tabs)/BottomTab/styleScreen/styleScreen1";
const logo = require("../assets/images/logo.png");
type ProjectDetailScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'ProjectDetail'>;


export default function Index() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [modalAlerteVisible, setmodalAlerteVisible] = useState(false);
  const navigation = useNavigation<ProjectDetailScreenNavigationProp['navigation']>();
  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector((state: RootState) => state.profile.profile);
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(loadAllUser());
  }, [dispatch]);

  function handleLogin() {
    if (username && password) {
      const userSow = users.find(user => user.emailUser === username && user.passwordUser === password);
      if (userSow) {
        dispatch(login(userSow))
        setUsername('')
        setPassword('')
      } else {
        setmodalAlerteVisible(true)
      }
    } else {
      setmodalAlerteVisible(true)
    }
  }
  if (auth.isAuthenticated) {
    navigation.navigate('detail');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>Se connecter</Text>
      <View style={styles.inputView}>
        <View style={styles.itemInput}>
          <Text style={styles.labelInput}>Identifiant</Text>
          <TextInput
            style={styles.input}
            placeholder="IDENTIFIANT "
            value={username}
            onChangeText={setUsername}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.itemInput}>
          <Text style={styles.labelInput}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="MOT DE PASSE"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

      </View>
      <View style={styles.buttonView}>
        <Pressable style={styles.button} onPress={() => handleLogin()}>
          <Text style={styles.buttonText}>SE CONNECTER</Text>
        </Pressable>
      </View>
      <View style={styles.mediaIcons}></View>
      <Text style={styles.footerText}>
        Avez-vous un compte ?<Text style={styles.signup}>
          <Link href="/singUpScreen" asChild><Text> S'inscrire</Text></Link></Text>
      </Text>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalAlerteVisible}
        onRequestClose={() => {
          setmodalAlerteVisible(!modalAlerteVisible);
        }}

      >
        <View style={styles.modalView}>
          <View style={styles.modalAlert}>
            <Text style={styles.modalText}>
              Entrer les informations correcte
            </Text>
            <View style={styles.modalButtons}>

              <Pressable style={styles.btnTerminer} onPress={() => setmodalAlerteVisible(false)}>
                <Text style={styles.btnTerminerText}>OK</Text>
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
    paddingTop: 70,
    backgroundColor: "#040618",
    justifyContent: "center",
  },
  image: {
    height: 160,
    width: 170,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 20,
    color: "#FFD80A",
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5,
  },
  itemInput: {
    display: 'flex',
    flexDirection: 'column',

  },
  labelInput: {
    color: 'white',
    marginBottom: 5
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "#FFD80A",
    borderWidth: 1,
    borderRadius: 7,
    color: "white",
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
    backgroundColor: "#FFD80A",
    height: 45,
    borderColor: "#FFD80A",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: COLORS.backgraiundNew,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonView: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 10
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
    color: "#FFD80A",
    fontSize: 13,
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    width: '60%',
    alignContent: 'center',
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
    width: '40%',
    borderWidth: 2,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: COLORS.accentOrange,
  },
});



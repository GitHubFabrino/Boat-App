import {
  View,
  Text,
  ImageBackground,
  Image,
  Pressable,
  StyleSheet,
  Modal,

} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList
} from "@react-navigation/drawer";
import Ionicons from '@expo/vector-icons/Ionicons';
import { DrawerNavigationHelpers, DrawerDescriptorMap } from "@react-navigation/drawer/lib/typescript/src/types";
import { DrawerNavigationState, ParamListBase, useFocusEffect } from "@react-navigation/native";
import { JSX, ReactNode, RefAttributes, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Logout } from "@/store/authSlice";
import React from "react";
import { COLORS } from "../BottomTab/styleScreen/styleScreen1";

interface DrawerProps {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
}
const CustomDrawer: React.FC<DrawerProps> = (props: DrawerProps) => {
  const users = useSelector((state: RootState) => state.profile.profile);
  const auth = useSelector((state: RootState) => state.auth);
  const [modalVisible, setmodalVisible] = useState(false);
  const { navigation } = props;

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    dispatch(Logout());
    setmodalVisible(false)
    console.log("logout : ", auth);
    navigation.navigate('index');
  }
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: "#0C0C0F",
          marginTop: -20,
          zIndex: 10,
        }}
      >
        <ImageBackground
          source={require("../../../assets/images/bg.jpeg")}
          style={{ padding: 20 }}
        >

          {auth?.photo ? (<Image
            source={{ uri: auth.photo }}
            style={styles.userAvatar}
            resizeMode="contain"
          />
          ) : <Image
            alt="Not find"
            source={require("../../../assets/images/user1.jpeg")}
            style={styles.userAvatar}
          />

          }
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              marginBottom: 5,
            }}
          >
            {auth?.nomUser}
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
        <Pressable onPress={() => { }} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,

                marginLeft: 10,
              }}
            >
              Partagée
            </Text>
          </View>
        </Pressable>
        <Pressable style={{ paddingVertical: 15 }}
          onPress={() => setmodalVisible(true)}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={{ fontSize: 15, marginLeft: 10 }}>Deconnexion</Text>
          </View>
        </Pressable>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setmodalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <View>
              <Text style={styles.modalText}>
                Voullez vous vraiment se deconnécté ?
              </Text>
              <View style={styles.modalButtons}>

                <Pressable style={styles.btnCommencer} onPress={() => setmodalVisible(false)}
                >
                  <Text style={styles.btnCommencerText}>ANNULER</Text>
                </Pressable>

                <Pressable style={styles.btnTerminer} onPress={() => {
                  dispatch(handleLogout)
                  setmodalVisible(false)
                }}>
                  <Text style={styles.btnTerminerText}>CONFIRMER</Text>
                </Pressable>

              </View>
            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  userAvatar: {
    height: 67.5,
    width: 67.5,
    borderRadius: 40,
    marginBottom: 10,
    marginTop: 30,
    backgroundColor: 'white'
  },
  switchTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 7,
    paddingVertical: 5,
  },
  preferences: {
    fontSize: 16,
    color: "#ccc",
    paddingTop: 10,
    fontWeight: "500",
    paddingLeft: 20,
  },
  switchText: {
    fontSize: 17,
    color: "",
    paddingTop: 10,
    fontWeight: "bold",
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
  },
  imageContainer: {
    width: 200,
    height: 200
  },
  confirmer: {
    backgroundColor: COLORS.accentOrange
  },
  annuler: {
    backgroundColor: COLORS.accentTeal
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
    fontWeight: '500',
  },
  btnTerminer: {
    width: '40%',
    borderWidth: 2,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderColor: COLORS.accentOrange,
  },
});

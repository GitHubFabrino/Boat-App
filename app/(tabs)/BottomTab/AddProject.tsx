
import { View, Text, TextInput, Pressable, Modal } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { addProject } from '@/store/projectSlice';
import { AppDispatch, RootState } from '@/store/store';
import { styles } from './styleScreen/styleAddProject';
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePicker from '@react-native-community/datetimepicker';

type ProjectDetailScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'ProjectDetail'>;

export default function AddProject() {
  const [nameProject, setnameProject] = useState<string>("");
  const [descPro, setdescPro] = useState<string>("");
  const [longueurBat, setlongueurBat] = useState<number | null>(null);
  const [startDate, setstartDate] = useState<Date>(new Date());
  const [endDate, setendDate] = useState<Date>(new Date());

  const [AlertVisible, setAlertVisible] = useState(false);
  const [ModalSucces, setModalSucces] = useState(false);
  const [MaxMesure, setMaxMesure] = useState(false);

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<ProjectDetailScreenNavigationProp['navigation']>();
  const auth = useSelector((state: RootState) => state.auth);
  const [totalDays, setTotalDays] = useState<number>(0);
  const [months, setMonths] = useState<number>(0);
  const [remainingDays, setRemainingDays] = useState<number>(0);
  const [erreurDate, setErreurDate] = useState<boolean>(false);

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState('#ffffff');

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setstartDate(currentDate);
    console.log("date start : ", startDate);
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setendDate(currentDate);
    console.log("date end : ", endDate);
    const formattedEndDate = formatDate(endDate);
    console.log("format end : ", formattedEndDate);

  };

  const ajouterNewProject = () => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    if (totalDays > 0) {
      if (nameProject && descPro && formattedStartDate && formattedEndDate && longueurBat !== null) {
        if (longueurBat <= 12.5 && longueurBat >= 3) {
          const dataProject = {
            name: nameProject,
            description: descPro,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            mesure: longueurBat
          };
          if (auth.id) {
            dispatch(addProject(dataProject, auth.id));
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              // setModalSucces(true);
            }, 8000);
            setModalSucces(true);
            setTimeout(() => setModalSucces(false), 12000);
            setnameProject('');
            setdescPro('');
            setlongueurBat(null);
            setstartDate(new Date());
            setendDate(new Date());
          } else {
            setMaxMesure(true);
          }
        } else {
          setMaxMesure(true);
        }
      } else {
        setAlertVisible(true);
        setErreurDate(true);
        setTimeout(() => {
          setAlertVisible(false);
          setMaxMesure(false);
          setErreurDate(false);
        }, 4000);
      }
    } else {
      if (nameProject && descPro && formattedStartDate && formattedEndDate && longueurBat !== null) {
        if (longueurBat <= 12.5 && longueurBat >= 3) {
          const dataProject = {
            name: nameProject,
            description: descPro,
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            mesure: longueurBat
          };
          if (auth.id) {
            dispatch(addProject(dataProject, auth.id));
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setModalSucces(true);
            }, 8000);

            setTimeout(() => setModalSucces(false), 12000);
            setnameProject('');
            setdescPro('');
            setlongueurBat(null);
            setstartDate(new Date());
            setendDate(new Date());
          } else {
            setMaxMesure(true);
          }
        } else {
          setMaxMesure(true);
        }
      } else {
        setAlertVisible(true);
        setErreurDate(true);
        setTimeout(() => {
          setAlertVisible(false);
          setMaxMesure(false);
          setErreurDate(false);
        }, 4000);
      }
      setErreurDate(true);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      const calculateDaysAndMonths = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const total = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
        setTotalDays(total);

        if (total < 0) {
          setErreurDate(true);
          return;
        } else {
          setErreurDate(false);
        }

        let remaining = total;
        let monthCount = 0;

        let currentDate = new Date(start);
        while (remaining > 0) {
          const currentMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
          if (remaining >= currentMonthDays) {
            remaining -= currentMonthDays;
            monthCount += 1;
            currentDate.setMonth(currentDate.getMonth() + 1);
          } else {
            break;
          }
        }
        setMonths(monthCount);
        setRemainingDays(remaining);
      };

      calculateDaysAndMonths();
    }
  }, [startDate, endDate]);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.containerTab}>
        <Text style={styles.text}>Créer un projet</Text>
      </View>

      <View style={styles.progress}>
        <View style={styles.itemInput}>
          <Text style={styles.labelInput}>Nom du projet</Text>
          <TextInput
            style={styles.input}
            placeholder="Nom "
            value={nameProject}
            onChangeText={setnameProject}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.itemInput}>
          <Text style={styles.labelInput}>Déscription</Text>
          <TextInput
            style={styles.input}
            placeholder="Description du projet "
            value={descPro}
            onChangeText={setdescPro}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.itemInput}>
          <Text style={styles.labelInput}>Longueur du bateau </Text>
          <TextInput
            style={styles.input}
            placeholder="Entrer la longueur du bateau"
            value={longueurBat !== null ? longueurBat.toString() : ''}
            onChangeText={text => setlongueurBat(parseFloat(text) || 0)}
            keyboardType="numeric"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        <View style={styles.date}>
          <View style={styles.itemInputDate}>
            <Text style={styles.labelInput}>Date du début</Text>
            <Pressable onPress={() => setShowStartDatePicker(true)}>
              <Text style={styles.dateText}>{formatDate(startDate)}</Text>
            </Pressable>
            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={handleStartDateChange}
              />
            )}
          </View>
          <View style={styles.itemInputDate}>
            <Text style={styles.labelInput}>Date de fin</Text>
            <Pressable onPress={() => setShowEndDatePicker(true)}>
              <Text style={styles.dateText}>{formatDate(endDate)}</Text>
            </Pressable>
            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={handleEndDateChange}
              />
            )}
          </View>
          <View style={styles.totalDate}>
            <Text style={styles.totalText}>{months} Mois</Text>
            <Text style={styles.totalText}>{remainingDays} Jours</Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={ajouterNewProject} style={styles.btnView}
      >
        <Text style={styles.btnViewText}>CONFIRMER</Text>
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={AlertVisible || MaxMesure || erreurDate}
        onRequestClose={() => {
          if (AlertVisible) {
            setAlertVisible(!AlertVisible);
          }
          if (MaxMesure) {
            setMaxMesure(!MaxMesure);
          }
          if (erreurDate) {
            setErreurDate(!erreurDate);
          }
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalAlert}>
            {AlertVisible && <Text style={styles.modalText}>Veuillez remplir tous les champs s'il vous plaît !</Text>}
            {MaxMesure && <Text style={styles.modalText} onPress={() => {

              setMaxMesure(false);

            }}>La mesure du bateau doit être comprise entre 3 et 12.5 mètres !</Text>}
            <View>
              <View style={styles.modalButtons}>
                <Pressable style={styles.btnTerminer} onPress={() => {
                  setAlertVisible(false);
                  setMaxMesure(false);
                  setErreurDate(false);
                  setstartDate(new Date());
                  setendDate(new Date());
                }}>
                  <Text style={styles.btnTerminerText}>OK</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={{ color: color }}
      />

      <Modal
        animationType="fade"
        transparent={true}
        visible={ModalSucces}
        onRequestClose={() => setModalSucces(!ModalSucces)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalAlert}>
            <Text style={styles.modalText}>Projet ajouté avec succès !</Text>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

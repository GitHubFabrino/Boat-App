
import { View, Text, ScrollView, Button } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect } from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamInfo } from '../Drawer/typesDrawer';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { ProgressItem } from './ProgressItem';
import { Project } from './Project.Interface';
import ProjectItem1 from './components/ProjectItem';
import { COLORS, styles } from './styleScreen/styleScreen1';
import { loadProjects, removeProject } from '@/store/projectSlice';



type RootStackParamList = {
  Home: undefined;
  ProjectDetail: Project;
};
type ProjectDetailScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'ProjectDetail'>;
type LoginProps = NativeStackScreenProps<RootStackParamInfo, 'Screen1'>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const Screen1: React.FC<LoginProps> = ({ route, navigation }) => {

  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector((state: RootState) => state.profile.profile);
  const auth = useSelector((state: RootState) => state.auth);

  useEffect(() => {

    if (auth.id) {
      dispatch(loadProjects(auth.id));
      // dispatch(loadEquipe(auth.id));
    } else {
      // navigationIndex.navigate('index');
    }
  }, [dispatch]);

  const projects = useSelector((state: RootState) => state.projects.projects);
  // const projects = useSelector((state: RootState) => state.projects.projects);
  const equipe = useSelector((state: RootState) => state.equipe.equipe);

  console.log("EQUIPE SUR SCREEN ", equipe);

  const handleDeleteProject = (projectId: number) => {
    dispatch(removeProject(projectId));
  };

  if (!projects || projects.length === 0) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.containerTab}>
          <Text style={styles.text}>Tableau de bord </Text>
        </View>
        <View style={styles.progress}>
          <ProgressItem number={0} label="Total" color="#159696" />
          <ProgressItem number={0} label="En cours" color="#C06900" />
          <ProgressItem number={0} label="Finie" color="#1D6E4C" />
        </View>

        <View style={styles.nodata}>
          {/* <Icon name="arrow-back-sharp" color={COLORS.textWhite} size={30} /> */}
          <Text style={styles.text}> Il n'y a pas encore de projet, veuillez créer</Text>
        </View>
      </ThemedView>
    );
  }
  console.log("data : ", projects);



  return (
    <ThemedView style={styles.container}>
      <View style={styles.containerTab}>
        <Text style={styles.text}>Tableau de bord </Text>
      </View>

      <View style={styles.progress}>
        <ProgressItem number={projects.length} label="Total" color="#159696" />
        <ProgressItem number={projects.filter(p => p.status === 'Encours').length} label="En cours" color="#C06900" />
        <ProgressItem number={projects.filter(p => p.status === 'Finie').length} label="Terminé" color="#1D6E4C" />
      </View>

      <ScrollView >
        <View style={styles.projet}>
          {projects.map((project, index) => (
            <ProjectItem1 key={project.id} project={project} />

          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

export default Screen1;

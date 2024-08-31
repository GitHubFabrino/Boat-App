import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { COLORS } from './styleScreen/styleScreen1';
import { SIZES, styles } from './styleScreen/styleScreen2';
import { Project } from './Project.Interface';
import { formatDate } from './service';

type ProjectDetailScreenNavigationProp = NativeStackScreenProps<RootStackParamList, 'ProjectDetail'>;

interface ProjectItemProps {
  name: string;
  description: string;
  progress: number;
  startDate: string;
  endDate: string;
}

export default function Screen2() {
  const projects = useSelector((state: RootState) => state.projects.projects);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.containerTab}>
        <Text style={styles.text}>Liste des projets</Text>
        <Text style={styles.subtext}>EN COURS</Text>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.project}>
          {projects.map((project, index) => (project.status == 'Encours' ? <ProjectItem2 key={project.id} project={project} name={''} description={''} progress={0} startDate={''} endDate={''} /> : <Text key={project.id}></Text>))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

interface ProjectItemProps {
  project: Project;
}

const ProjectItem2: React.FC<ProjectItemProps> = ({ project }) => {
  const navigation = useNavigation<ProjectDetailScreenNavigationProp['navigation']>();

  return (
    <View style={styles.projectItem}>
      <View style={styles.descriptionProgress}>
        <View style={styles.containerName}>
          <ThemedText type="defaultSemiBold" style={styles.name}>
            {project.name}
          </ThemedText>
        </View>
        <View style={styles.desc}>
          <Text style={styles.descText}>{project.description}</Text>
        </View>

        <Pressable style={styles.btnView} onPress={() => navigation.navigate('ProjectDetail', { ...project })}>
          <Text style={styles.btnViewText}>DETAILS</Text>
        </Pressable>
      </View>
      <View style={styles.circleProgress}>
        <CircularProgress

          size={SIZES.progressSize}
          width={SIZES.progressWidth}
          fill={project.progress}
          tintColor={COLORS.progressTint}
          backgroundColor={COLORS.progressBackground}
        >
          {() => <Text style={styles.textProgress}>{`${project.progress}%`}</Text>}
        </CircularProgress>
        <View style={styles.dateProject}>
          <Text style={styles.date}>
            Début : <Text style={styles.dateDetail}>{formatDate(project.startDate)}</Text>
          </Text>
          <Text style={styles.date}>
            Fin : <Text style={styles.dateDetail}>{formatDate(project.endDate)}</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};


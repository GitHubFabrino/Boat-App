
import React, { Suspense, useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, Modal } from 'react-native';
import { CircularProgress } from 'react-native-circular-progress';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from '@expo/vector-icons/Ionicons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { RootStackParamList } from './types';
import { formatDate } from './service';
import { styles } from './styleScreen/styleDetailScreen';

import Tache from './components/Tache';
import Materielle from './components/Materiel';
import MateriauxScreen from './components/Materiaux';
import { COLORS } from './styleScreen/styleScreen1';
import { useSelector } from 'react-redux';
import { selectProjectById } from '@/store/projectSlice';
import Dimension from './components/Dimension';
import { Canvas } from '@react-three/fiber/native';
// import { View, StyleSheet } from 'react-native';
import { OrbitControls, useGLTF } from '@react-three/drei/native';
type ProjectDetailProps = NativeStackScreenProps<RootStackParamList, 'ProjectDetail'>;


const Tab = createMaterialTopTabNavigator();

const ProjectDetail: React.FC<ProjectDetailProps> = ({ route, navigation }) => {
    const { id } = route.params;
    const project = useSelector((state: any) => selectProjectById(state, id));
    console.log('All Project : ', project);
    const mesurea = project?.mesure

    const [totalDays, setTotalDays] = useState(0);
    const [remainingDays, setRemainingDays] = useState(0);
    const [modal3D, setmodal3D] = useState(false);

    useEffect(() => {
        if (project) {
            const calculateDays = () => {
                const [startYear, startMonth, startDay,] = project.startDate.split('-').map(Number);
                const [endYear, endMonth, endDay] = project.endDate.split('-').map(Number);

                const start = new Date(startYear, startMonth - 1, startDay);
                const end = new Date(endYear, endMonth - 1, endDay);
                const now = new Date();

                const total = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
                let remaining = Math.ceil((end.getTime() - now.getTime()) / (1000 * 3600 * 24));
                remaining <= 0 ? (remaining = 0) : (remaining)
                setTotalDays(total);
                setRemainingDays(remaining);
            };
            calculateDays();
        }
    }, [project, modal3D]);



    const Boat = () => {
        const { scene } = useGLTF('../../../boat_fixed_for_review.glb');

        return <primitive object={scene} scale={0.1} />;
    };
    return (
        <ThemedView style={styles.container}>

            <Pressable style={styles.btnView} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back-sharp" color={COLORS.textWhite} size={15} />
            </Pressable>

            <ThemedText type='defaultSemiBold' style={styles.title}>Détails</ThemedText>
            <ThemedText type='defaultSemiBold' style={styles.titleProject}>{project?.name}</ThemedText>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                {project && <View>
                    <View style={styles.progress}>
                        <View style={styles.CercleProgress}>
                            <CircularProgress
                                size={70}
                                width={5}
                                fill={project?.progress}
                                tintColor={project.status == 'Encours' ? "#C06900" : "#1A5C41"}
                                backgroundColor={COLORS.background}
                            >
                                {() => <Text style={styles.TextProgress}>{project?.progress}%</Text>}
                            </CircularProgress>
                        </View>

                        <View style={styles.day}>
                            <Text style={styles.dayReste}>{remainingDays}/{totalDays}</Text>
                            <Text style={styles.dayText}>JOURS</Text>
                            <Text style={styles.dayText}>RESTANT</Text>
                        </View>
                        <View style={styles.dayDateContainer}>
                            <View>
                                <Text style={styles.dayTextDate}>DEBUT</Text>
                                <Text style={styles.dayDate}>{formatDate(project.startDate)}</Text>
                            </View>
                            <View>
                                <Text style={styles.dayTextDate}>FIN</Text>
                                <Text style={styles.dayDate}>{formatDate(project.endDate)}</Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.containerDesc}>
                        <Text style={styles.textDesc}>
                            {project?.description}
                        </Text>

                        <Text style={styles.textDesc}>
                            La longueur du bateau est : {project?.mesure} m
                        </Text>
                    </View>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modal3D}
                        onRequestClose={() => {
                            setmodal3D(!modal3D);
                        }}

                    >
                        <View style={styles.modalView3D}>
                            <View style={styles.modalAlert}>
                                <View style={styles.containerimage}>
                                    <Canvas style={{ flex: 1, width: '100%' }}>
                                        <ambientLight intensity={0.5} />
                                        <directionalLight position={[0, 0, 5]} />
                                        <Suspense fallback={null}>
                                            <Boat />
                                        </Suspense>
                                        <OrbitControls />
                                    </Canvas>
                                </View>
                                <View style={styles.modalButtons}>

                                    <Pressable style={styles.btnTerminer} onPress={() => setmodal3D(false)}>
                                        <Text style={styles.btnTerminerText}>OK</Text>
                                    </Pressable>

                                </View>
                            </View>

                        </View>
                    </Modal>


                    <Tab.Navigator
                        initialRouteName="Dimension"
                        screenOptions={{

                            tabBarStyle: { backgroundColor: COLORS.containerProject, height: 40 },
                            tabBarIndicatorStyle: { backgroundColor: '#C06900' },
                            tabBarLabelStyle: { fontSize: 8, fontWeight: 'bold', color: 'white' },
                            tabBarActiveTintColor: '#C06900',
                            tabBarInactiveTintColor: '#fff',
                        }
                        }

                    >
                        <Tab.Screen
                            name="Dimension"
                            children={() => <Dimension projectId={id} />}
                            options={{ tabBarLabel: 'Dimension' }}
                        />
                        <Tab.Screen
                            name="Tache"
                            children={() => <Tache projectId={id} />}
                            options={{ tabBarLabel: 'Tâches' }}
                        />
                        <Tab.Screen
                            name="Materiel"
                            children={() => <Materielle projectId={id} />}
                            options={{ tabBarLabel: 'Matériel' }}
                        />
                        <Tab.Screen
                            name="Materiaux"
                            children={() => <MateriauxScreen projectId={id} />}
                            options={{ tabBarLabel: 'Matériaux' }}
                        />
                    </Tab.Navigator>
                </View>
                }
            </ScrollView>
        </ThemedView>
    );
};

export default ProjectDetail;

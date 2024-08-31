import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { PropsProject } from '../Project.Interface';
import { styles } from '../styleScreen/styleDetailScreen';

const boat = require('../../../../assets/images/dessin.png')
const Dimension: React.FC<PropsProject> = ({ projectId }) => {
    const project = useSelector((state: RootState) => state.projects.projects.find(proj => proj.id === projectId));
    const mesurea = project?.mesure;

    const [A, setA] = useState<number | null>(null);
    const [B, setB] = useState<number | null>(null);
    const [Dmin, setDmin] = useState<number | null>(null);
    const [Dmax, setDmax] = useState<number | null>(null);
    const [E, setE] = useState<number | null | undefined>(mesurea);
    const [F, setF] = useState<number | null>(120);
    const [Xmin, setXmin] = useState<number | null>(null);
    const [Xmax, setXmax] = useState<number | null>(null);
    const [Xmoy, setXmoy] = useState<number | null>(null);
    const [Hmin, setHmin] = useState<number | null>(null);
    const [Hmax, setHmax] = useState<number | null>(null);
    const [nbGmin, setNbGmin] = useState<number | null>(null);
    const [nbGmax, setNbGmax] = useState<number | null>(null);
    const [totalDays, setTotalDays] = useState<number>(0);
    const [remainingDays, setRemainingDays] = useState<number>(0);
    const [erreurDate, setErreurDate] = useState<boolean>(false);


    useEffect(() => {
        if (project) {
            const calculateDays = () => {
                const [startYear, startMonth, startDay] = project.startDate.split('-').map(Number);
                const [endYear, endMonth, endDay] = project.endDate.split('-').map(Number);

                const start = new Date(startYear, startMonth - 1, startDay);
                const end = new Date(endYear, endMonth - 1, endDay);
                const now = new Date();

                const total = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
                let remaining = Math.ceil((end.getTime() - now.getTime()) / (1000 * 3600 * 24));
                remaining = Math.max(remaining, 0);
                setTotalDays(total);
                setRemainingDays(remaining);
            };
            calculateDays();
        }

        if (E !== undefined && E !== null) {
            setA(Math.round(E / 3));

            if (E <= 6.5) setB(1.2);
            else if (E <= 10) setB(1.3);
            else setB(2);

            if (E > 9) {
                setDmax(1.4);
                setDmin(1);
            } else {
                setDmax(1);
                setDmin(0.9);
            }

            if (E > 7) {
                setHmin(0.4);
                setHmax(0.45);
                setNbGmin(Math.round(E / (0.4 + 0.1)));
                setNbGmax(Math.round(E / (0.45 + 0.1)));
            } else {
                setHmin(0.35);
                setHmax(0.4);
                setNbGmin(Math.round(E / (0.35 + 0.1)));
                setNbGmax(Math.round(E / (0.4 + 0.1)));
            }

            if (E <= 6) setXmoy(1.5);
            else if (E <= 8) {
                setXmin(1.7);
                setXmax(1.8);
            } else if (E <= 10) {
                setXmin(2);
                setXmax(2.2);
            } else setXmoy(2.4);
        }
    }, [project, E]);

    return (
        <ScrollView contentContainerStyle={styles.tabContentContainer}>
            <View>
                <Text style={styles.dimText}>La dimensionnement du bateau</Text>
                <View style={styles.Containerimage}>
                    <Image source={boat} style={styles.image} resizeMode="contain" />
                </View>
                <View style={styles.ContainerDim}>
                    <View style={styles.ContainerItem}>
                        <View style={styles.ContainerDimIteme}>
                            <Text style={styles.dimTextItem}>A : {A} m</Text>
                            <Text style={styles.dimTextItem}>E : {E} m</Text>
                        </View>
                        <View style={styles.ContainerDimIteme}>
                            <Text style={styles.dimTextItem}>B : {B} m</Text>
                            <Text style={styles.dimTextItem}>F : {F}°</Text>
                        </View>
                        <View style={styles.ContainerDimIteme}>
                            <Text style={styles.dimTextItem}>Dmin : {Dmin} m</Text>
                            <Text style={styles.dimTextItem}>Dmax : {Dmax} m</Text>
                        </View>
                    </View>
                    <View style={styles.ContainerItem}>
                        <View style={styles.ContainerDimIteme}>
                            {Xmin && <Text style={styles.dimTextItem}>Xmin : {Xmin} m</Text>}
                            {Xmax && <Text style={styles.dimTextItem}>Xmax : {Xmax} m</Text>}
                            {Xmoy && <Text style={styles.dimTextItem}>Xmoy : {Xmoy} m</Text>}
                        </View>
                        <View style={styles.ContainerDimIteme}>
                            <Text style={styles.dimTextItem}>Hmin : {Hmin} m</Text>
                            <Text style={styles.dimTextItem}>Hmax : {Hmax} m</Text>
                        </View>
                        <View style={styles.ContainerDimIteme}>
                            <Text style={styles.dimTextItem}>nbGmin : {nbGmin}</Text>
                            <Text style={styles.dimTextItem}>nbGmax : {nbGmax}</Text>
                        </View>
                    </View>
                </View>
                {erreurDate && <Text>Erreur: La date de fin est avant la date de début.</Text>}
            </View>
        </ScrollView>

    );
}

export default Dimension;

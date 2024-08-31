import { View, Text } from "react-native";
import { styles } from "./styleScreen/styleScreen1";

interface ProgressItemProps {
    number: number;
    label: string;
    color: string;
}

export const ProgressItem: React.FC<ProgressItemProps> = ({ number, label, color }) => (
    <View style={styles.ItemProgress}>
        <View style={[styles.ItemNumber, { borderBottomColor: color }]}>
            <Text style={styles.number}>{number}</Text>
        </View>
        <Text style={styles.label}>{label}</Text>
    </View>
);
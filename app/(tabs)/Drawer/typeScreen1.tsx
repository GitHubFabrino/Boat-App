// types.ts
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackScreens = {
    index: undefined;
    detail: undefined;
    Screen2: undefined;
    Home: undefined;
    singUpScreen: undefined;
    Screen1: undefined;
};

export type Screen1Props = NativeStackScreenProps<StackScreens, 'Screen1'>;

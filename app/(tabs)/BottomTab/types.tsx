import { Project } from "./Project.Interface";

// types.ts
export type RootStackParamList = {
    Home: undefined;
    ProjectDetail: Project
    Info: {
        usermane: string
        password: string
    }
    detail: undefined
};

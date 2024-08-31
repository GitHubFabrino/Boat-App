export interface User {
    id: number
    nomUser: string
    prenomUser: string
    emailUser: string
    passwordUser: string
    photo: string
    //  status: boolean
}
export interface Equipe {
    id: number
    nom: string
    prenom: string
    poste: string
    photo: string
    userId: number
}
export interface UserToDb {

    nomUser: string
    prenomUser: string
    emailUser: string
    passwordUser: string
    photo: string
    //  status: boolean
}

export interface PropsProject {
    projectId: number
}
export interface Personnes {
    idpersonne: number
    nom: string
    prenom: string
    tacheId: number
}

export interface Taches {
    id: number
    titre: string
    description: string
    statusStart: number
    statusEnd: number
    dateStart: string
    dateEnd: string
    personne: Personnes[]
    projectId: number
}
export interface Materiel {
    id: number
    // idMateriel: number
    nomMateriel: string
    nombreMateriel: string
    imageMateriel: string
    dateAjoutMateriel: string
    projectId: number
}


export interface Materiaux {

    id: number
    nomMateriaux: string
    nombreMateriaux: string
    imageMateriaux: string
    dateAjoutMateriaux: string
    projectId: number

}

export interface Project {
    id: number,
    userId: number
    name: string;
    progress: number;
    status: string;
    description: string;
    startDate: string;
    endDate: string;
    mesure: number | null
    tache: Taches[]
    materiel: Materiel[]
    materiaux: Materiaux[]
}

export interface MaterielConst {
    idMateriel: number
    nomMateriel: string
    nombreMateriel: string
    imageMateriel: string | undefined
    projectId: number | null
}
export interface MaterielConstNoId {

    nomMateriel: string
    nombreMateriel: string
    imageMateriel: string | undefined
    projectId: number | null
}
export interface MaterielConstId {
    nomMateriel: string
    nombreMateriel: string
    imageMateriel: string | undefined
    projectId: number | null
}
export interface MateriauxConst {
    id: number
    nomMateriaux: string
    nombreMateriaux: string
    imageMateriaux: string | undefined
    projectId: number | null
}

export interface ProjetConst {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    mesure: number | null
}
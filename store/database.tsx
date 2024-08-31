
import * as SQLite from 'expo-sqlite';
import { Equipe, Materiaux, Materiel, Personnes, Project, Taches, User, UserToDb } from '../app/(tabs)/BottomTab/Project.Interface';


const db = typeof window !== 'undefined' ? SQLite.openDatabase('projectsDB1.db') : null;


export const createTables = () => {
    db?.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, nomUser TEXT, prenomUser TEXT, emailUser TEXT, passwordUser TEXT , photo TEXT);'
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS equipe (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, prenom TEXT , photo TEXT ,userId INTEGER, FOREIGN KEY (userId) REFERENCES users (id));'
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, startDate TEXT, endDate TEXT, mesure INTEGER, progress INTEGER, status TEXT, userId INTEGER, FOREIGN KEY (userId) REFERENCES users (id));'
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS taches (id INTEGER PRIMARY KEY NOT NULL, projectId INTEGER, titre TEXT, description TEXT, statusStart INTEGER, statusEnd INTEGER, dateStart TEXT, dateEnd TEXT, FOREIGN KEY(projectId) REFERENCES projects(id));'
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS personnes (id INTEGER PRIMARY KEY NOT NULL, tacheId INTEGER, nom TEXT, prenom TEXT, FOREIGN KEY(tacheId) REFERENCES taches(id));'
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS materiel (id INTEGER PRIMARY KEY NOT NULL, projectId INTEGER, nomMateriel TEXT, nombreMateriel TEXT, imageMateriel TEXT, dateAjoutMateriel TEXT, FOREIGN KEY(projectId) REFERENCES projects(id));'
        );
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS materiaux (id INTEGER PRIMARY KEY NOT NULL, projectId INTEGER, nomMateriaux TEXT, nombreMateriaux TEXT, imageMateriaux TEXT, dateAjoutMateriaux TEXT, FOREIGN KEY(projectId) REFERENCES projects(id));'
        );
    });

    console.log('Tables created successfully');
};

export const insertUser = (user: UserToDb): Promise<void> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'INSERT INTO users (nomUser, prenomUser, emailUser, passwordUser , photo ) VALUES (?, ?, ?, ?, ?);',
                [user.nomUser, user.prenomUser, user.emailUser, user.passwordUser, user.photo],
                (_, result) => {
                    console.log('User inserted successfully with ID:', result.insertId);
                    resolve();
                },
                (_, error) => {
                    console.log('Failed to insert user:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const updateUseToDb = (updateuser: User): Promise<void> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'UPDATE users SET nomUser = ?, prenomUser = ?, emailUser = ?, passwordUser = ? , photo = ? WHERE id = ?;',
                [updateuser.nomUser, updateuser.prenomUser, updateuser.emailUser, updateuser.passwordUser, updateuser.photo, updateuser.id],
                () => {
                    console.log('USER updated successfully');
                    resolve();
                },
                (_, error) => {
                    console.log('Failed to update tache:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
export const insertProject = (project: Project, userId: number): Promise<number> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'INSERT INTO projects (name, description, startDate, endDate, mesure, progress, status, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
                [project.name, project.description, project.startDate, project.endDate, project.mesure, project.progress, project.status, userId],
                (_, result) => {
                    console.log('Project inserted successfully with ID:', result.insertId);
                    if (result.insertId !== undefined) {
                        console.log('Project inserted successfully with ID:', result.insertId);
                        resolve(result.insertId);
                    } else {
                        console.log('Failed to retrieve insertId after inserting project');
                        reject(new Error('Failed to retrieve insertId'));
                    }
                },
                (_, error) => {
                    console.log('Failed to insert project:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const insertTache = (tache: Taches, projectId: number): Promise<number> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'INSERT INTO taches (projectId, titre, description,statusStart, statusEnd, dateStart, dateEnd) VALUES (?, ?, ?, ?, ?, ?, ?);',
                [tache.projectId, tache.titre, tache.description, tache.statusStart, tache.statusEnd, tache.dateStart, tache.dateEnd],
                (_, result) => {
                    if (result.insertId !== undefined) {
                        console.log('Tache inserted successfully with ID:', result.insertId);
                        resolve(result.insertId);
                    } else {
                        console.log('Failed to retrieve insertId after inserting project');
                        reject(new Error('Failed to retrieve insertId'));
                    }
                },
                (_, error) => {
                    console.log('Failed to insert project:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const insertEquipeInDb = (equipes: Equipe): Promise<number> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'INSERT INTO equipe (nom, prenom, photo,userId ) VALUES (?, ?, ?, ?);',
                [equipes.nom, equipes.prenom, equipes.photo, equipes.userId],
                (_, result) => {
                    if (result.insertId !== undefined) {
                        console.log('Tache inserted successfully with ID:', result.insertId);
                        resolve(result.insertId);
                    } else {
                        console.log('Failed to retrieve insertId after inserting project');
                        reject(new Error('Failed to retrieve insertId'));
                    }
                },
                (_, error) => {
                    console.log('Failed to insert project:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
export const findOneTache = (tacheId: number): Promise<Taches[] | null> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM taches WHERE id = ?;',
                [tacheId],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        const projectsArray: Taches[] = [];
                        for (let i = 0; i < rows.length; i++) {
                            projectsArray.push(rows.item(i));
                        }
                        resolve(projectsArray);
                    } else {
                        resolve(null);
                    }
                },
                (_, error) => {
                    console.log('Failed to retrieve user ID:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const findTacheByIdProject = (idProject: number): Promise<Taches[] | null> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM taches WHERE projectId = ?;',
                [idProject],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        const projectsArray: Taches[] = [];
                        for (let i = 0; i < rows.length; i++) {
                            projectsArray.push(rows.item(i));
                        }
                        resolve(projectsArray);
                    } else {
                        resolve(null);
                    }
                },
                (_, error) => {
                    console.log('Failed to retrieve user ID:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};


export const updateTache = (tache: Taches): Promise<void> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'UPDATE taches SET projectId = ?, titre = ?, description = ?, statusStart = ?, statusEnd = ?, dateStart = ?, dateEnd = ? WHERE id = ?;',
                [tache.projectId, tache.titre, tache.description, tache.statusStart, tache.statusEnd, tache.dateStart, tache.dateEnd, tache.id],
                () => {
                    console.log('Tache updated successfully');
                    resolve();
                },
                (_, error) => {
                    console.log('Failed to update tache:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
export const fetchAllTacheByProject = (projectId: number): Promise<Taches[]> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM taches WHERE projectId = ?;',
                [projectId],
                async (_, { rows }) => {
                    console.log(rows);

                    const projectsArray: Taches[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        const tache = rows.item(i)
                        console.log("tache ID : ", tache.id);

                        const personnes = await findAllPersonneTacheByTacheId(tache.id)
                        console.log('PERSONNE TACHE :', personnes);

                        tache.personne = personnes

                        projectsArray.push(tache);
                    }
                    console.log('Data fetched for tachesAll:', projectsArray);
                    resolve(projectsArray);
                },
                (_, error) => {
                    console.log('Failed to retrieve data:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const insertMateriaux = (materiaux: Materiaux, projectId: number): Promise<number> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'INSERT INTO materiaux (projectId, nomMateriaux, nombreMateriaux, imageMateriaux, dateAjoutMateriaux) VALUES (?, ?, ?, ?, ?);',
                [materiaux.projectId, materiaux.nomMateriaux, materiaux.nombreMateriaux, materiaux.imageMateriaux, materiaux.dateAjoutMateriaux],
                (_, result) => {
                    if (result.insertId !== undefined) {
                        console.log('Materiaux inserted successfully with ID:', result.insertId);
                        resolve(result.insertId);
                    } else {
                        console.log('Failed to retrieve insertId after inserting project');
                        reject(new Error('Failed to retrieve insertId'));
                    }
                },
                (_, error) => {
                    console.log('Failed to insert project:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const fetchAllMateriauxByProject = (projectId: number): Promise<Materiaux[]> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM materiaux WHERE projectId = ?;',
                [projectId],
                (_, { rows }) => {
                    console.log(rows);

                    const projectsArray: Materiaux[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        projectsArray.push(rows.item(i));
                    }
                    console.log('Data fetched for MateriauxAll:', projectsArray);
                    resolve(projectsArray);
                },
                (_, error) => {
                    console.log('Failed to retrieve data:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};



export const insertMateriel = (materiel: Materiel, projectId: number): Promise<number> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'INSERT INTO materiel ( projectId, nomMateriel, nombreMateriel, imageMateriel, dateAjoutMateriel) VALUES (?, ?, ?, ?, ?);',
                [materiel.projectId, materiel.nomMateriel, materiel.nombreMateriel, materiel.imageMateriel, materiel.dateAjoutMateriel],
                (_, result) => {
                    if (result.insertId !== undefined) {
                        console.log('Materiel inserted successfully with ID:', result.insertId);
                        resolve(result.insertId);
                    } else {
                        console.log('Failed to retrieve insertId after inserting project');
                        reject(new Error('Failed to retrieve insertId'));
                    }
                },
                (_, error) => {
                    console.log('Failed to insert project:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const fetchAllMaterielByProject = (projectId: number): Promise<Materiel[]> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM materiel WHERE projectId = ?;',
                [projectId],
                (_, { rows }) => {
                    console.log(rows);

                    const projectsArray: Materiel[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        projectsArray.push(rows.item(i));
                    }
                    console.log('Data fetched for MaterielAll:', projectsArray);
                    resolve(projectsArray);
                },
                (_, error) => {
                    console.log('Failed to retrieve data:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const findMaterielByIdMateriel = (idMateriel: number): Promise<Materiel[]> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM materiel WHERE id = ?;',
                [idMateriel],
                (_, { rows }) => {
                    console.log(rows);

                    const projectsArray: Materiel[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        projectsArray.push(rows.item(i));
                    }
                    console.log('Data fetched for MaterielAll:', projectsArray);
                    resolve(projectsArray);
                },
                (_, error) => {
                    console.log('Failed to retrieve data:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const findMateriauxByIdMateriel = (idMateriaux: number): Promise<Materiaux[]> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM materiaux WHERE id = ?;',
                [idMateriaux],
                (_, { rows }) => {
                    console.log(rows);

                    const projectsArray: Materiaux[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        projectsArray.push(rows.item(i));
                    }
                    console.log('Data fetched for MaterielAll:', projectsArray);
                    resolve(projectsArray);
                },
                (_, error) => {
                    console.log('Failed to retrieve data:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
export const insertPersonneTache = (personneTache: Personnes, tacheId: number): Promise<number> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'INSERT INTO personnes ( tacheId, nom, prenom) VALUES (?, ?, ?);',
                [personneTache.tacheId, personneTache.nom, personneTache.prenom],
                (_, result) => {
                    if (result.insertId !== undefined) {
                        console.log('PersonneTache inserted successfully with ID:', result.insertId);
                        resolve(result.insertId);
                    } else {
                        console.log('Failed to retrieve insertId after inserting project');
                        reject(new Error('Failed to retrieve insertId'));
                    }
                },
                (_, error) => {
                    console.log('Failed to insert project:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
export const findOnePersonneTache = (idPersonneTache: number): Promise<Personnes[]> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM personnes WHERE id = ?;',
                [idPersonneTache],
                (_, { rows }) => {
                    console.log(rows);

                    const projectsArray: Personnes[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        projectsArray.push(rows.item(i));
                    }
                    console.log('Data fetched for MaterielAll:', projectsArray);
                    resolve(projectsArray);
                },
                (_, error) => {
                    console.log('Failed to retrieve data:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};


export const findAllPersonneTacheByTacheId = (tacheId: number): Promise<Personnes[]> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM personnes WHERE tacheId = ?;',
                [tacheId],
                (_, { rows }) => {
                    console.log(rows);

                    const projectsArray: Personnes[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        projectsArray.push(rows.item(i));
                    }
                    console.log('Data fetched for Find personne by tache id:', projectsArray);
                    resolve(projectsArray);
                },
                (_, error) => {
                    console.log('Failed to retrieve data:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const findAllPersonneTache = (): Promise<Personnes[]> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM personnes ;',
                [],
                (_, { rows }) => {
                    console.log(rows);

                    const projectsArray: Personnes[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        projectsArray.push(rows.item(i));
                    }
                    console.log('Data fetched for MaterielAll:', projectsArray);
                    resolve(projectsArray);
                },
                (_, error) => {
                    console.log('Failed to retrieve data:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
export const fetchProjects = (userId: number): Promise<Project[]> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM projects WHERE userId = ?;',
                [userId],
                async (_, { rows }) => {
                    const projectsArray: Project[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        const project = rows.item(i)
                        let taches = await fetchAllTacheByProject(project.id)
                        let materiaux = await fetchAllMateriauxByProject(project.id)
                        let materiels = await fetchAllMaterielByProject(project.id)
                        project.tache = taches
                        project.materiel = materiels
                        project.materiaux = materiaux

                        projectsArray.push(project);
                    }
                    console.log('Data fetched for user:', projectsArray);
                    //fetchAllTacheByProject()
                    resolve(projectsArray);
                },
                (_, error) => {
                    console.log('Failed to retrieve data:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
export const fetchEquipeByUserId = (userId: number): Promise<Equipe[]> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM equipe WHERE userId = ?;',
                [userId],
                async (_, { rows }) => {
                    const equipeArray: Equipe[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        const equipe = rows.item(i)
                        equipeArray.push(equipe);
                    }
                    console.log('EQUIPE:', equipeArray);
                    //fetchAllTacheByProject()
                    resolve(equipeArray);
                },
                (_, error) => {
                    console.log('Failed to retrieve data:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
export const findEquipeById = (id: number): Promise<Equipe[]> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM equipe WHERE id = ?;',
                [id],
                async (_, { rows }) => {
                    const equipeArray: Equipe[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        const equipe = rows.item(i)
                        equipeArray.push(equipe);
                    }
                    console.log('EQUIPE:', equipeArray);
                    //fetchAllTacheByProject()
                    resolve(equipeArray);
                },
                (_, error) => {
                    console.log('Failed to retrieve data:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
export const fetchProjectsById = (idProject: number): Promise<Project[]> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM projects WHERE id = ?;',
                [idProject],
                async (_, { rows }) => {
                    const projectsArray: Project[] = [];
                    for (let i = 0; i < rows.length; i++) {
                        const project = rows.item(i)
                        projectsArray.push(project);
                    }
                    console.log('Data fetched for project:', projectsArray);
                    //fetchAllTacheByProject()
                    resolve(projectsArray);
                },
                (_, error) => {
                    console.log('Failed to retrieve data:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
export const deleteProjectFromDB = (projectId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'DELETE FROM projects WHERE id = ?;',
                [projectId],
                () => {
                    console.log('Project deleted successfully');
                    resolve();
                },
                (_, error) => {
                    console.log('Failed to delete project:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
export const deleteEquipeFromDB = (idEquipe: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'DELETE FROM equipe WHERE id = ?;',
                [idEquipe],
                () => {
                    console.log('Equipe deleted successfully');
                    resolve();
                },
                (_, error) => {
                    console.log('Failed to delete project:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const deleteMaterielFromDB = (idMateriel: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'DELETE FROM materiel WHERE id = ?;',
                [idMateriel],
                // 'DELETE FROM materiel ;',
                // [],
                () => {
                    console.log('Project deleted successfully');
                    resolve();
                },
                (_, error) => {
                    console.log('Failed to delete project:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const deleteMaterielByIdProject = (idProject: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'DELETE FROM materiel WHERE projectId = ?;',
                [idProject],
                // 'DELETE FROM materiel ;',
                // [],
                () => {
                    console.log('Project deleted successfully');
                    resolve();
                },
                (_, error) => {
                    console.log('Failed to delete project:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};


export const deletePersonneByIdTache = (tacheId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'DELETE  FROM personnes WHERE tacheId = ?;',
                [tacheId],
                // 'DELETE FROM materiel ;',
                // [],
                () => {
                    console.log('Project deleted successfully');
                    resolve();
                },
                (_, error) => {
                    console.log('Failed to delete project:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};


export const deleteTacheByIdProject = (projectId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'DELETE  FROM taches WHERE projectId = ?;',
                [projectId],
                // 'DELETE FROM materiel ;',
                // [],
                () => {
                    console.log('Project deleted successfully');
                    resolve();
                },
                (_, error) => {
                    console.log('Failed to delete project:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
export const deleteMateriauxFromDB = (idMateriaux: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'DELETE FROM materiaux WHERE id = ?;',
                [idMateriaux],
                () => {
                    console.log('Project deleted successfully');
                    resolve();
                },
                (_, error) => {
                    console.log('Failed to delete project:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
export const deleteMateriauxByIdProject = (idProject: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'DELETE  FROM materiaux WHERE projectId = ?;',
                [idProject],
                () => {
                    console.log('Project deleted successfully');
                    resolve();
                },
                (_, error) => {
                    console.log('Failed to delete project:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
interface updateProjectDataInt {
    id: number,
    userId: number,
    name: string,
    progress: number,
    status: string,
    description: string,
    startDate: string,
    endDate: string,
    mesure: number | null,
}
export const updateProjectProgress = (projectUpdate: updateProjectDataInt): Promise<void> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'UPDATE projects SET name = ? ,description = ? , startDate = ? , endDate = ? ,mesure = ? ,progress = ?, status = ?, userId = ?  WHERE id = ?;',
                [projectUpdate.name, projectUpdate.description, projectUpdate.startDate, projectUpdate.endDate, projectUpdate.mesure, projectUpdate.progress, projectUpdate.status, projectUpdate.userId, projectUpdate.id],
                () => {
                    console.log('Project updated successfully');
                    resolve();
                },
                (_, error) => {
                    console.log('Failed to update tache:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const updateMaterielInDb = (materielUpdate: Materiel): Promise<void> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'UPDATE materiel SET projectId = ?, nomMateriel = ?, nombreMateriel = ?, imageMateriel = ?, dateAjoutMateriel = ?   WHERE id = ?;',
                [materielUpdate.projectId, materielUpdate.nomMateriel, materielUpdate.nombreMateriel, materielUpdate.imageMateriel, materielUpdate.dateAjoutMateriel, materielUpdate.id],
                () => {
                    console.log('Materiel updated successfully');
                    resolve();
                },
                (_, error) => {
                    console.log('Failed to update tache:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const updateMateriauxInDb = (materiauxUpdate: Materiaux): Promise<void> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'UPDATE materiaux SET projectId = ?, nomMateriaux = ?, nombreMateriaux = ?, imageMateriaux = ?, dateAjoutMateriaux = ?  WHERE id = ?;',
                [materiauxUpdate.projectId, materiauxUpdate.nomMateriaux, materiauxUpdate.nombreMateriaux, materiauxUpdate.imageMateriaux, materiauxUpdate.dateAjoutMateriaux, materiauxUpdate.id],
                () => {
                    console.log('Materiel updated successfully');
                    resolve();
                },
                (_, error) => {
                    console.log('Failed to update tache:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
export const fetchUserIdByEmail = (email: string): Promise<number | null> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT id FROM users WHERE emailUser = ?;',
                [email],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        resolve(rows.item(0).id);
                    } else {
                        resolve(null);
                    }
                },
                (_, error) => {
                    console.log('Failed to retrieve user ID:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const fetchUserById = (userId: number): Promise<number | null> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT id FROM users WHERE id = ?;',
                [userId],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        resolve(rows.item(0).id);
                    } else {
                        resolve(null);
                    }
                },
                (_, error) => {
                    console.log('Failed to retrieve user ID:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const findUserById = (userId: number): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM users WHERE id = ?;',
                [userId],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        resolve(rows.item(0));
                    } else {
                        resolve(null);
                    }
                },
                (_, error) => {
                    console.log('Failed to retrieve user ID:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};

export const fetchUserByEmailAndPwd = (email: string, pwd: string): Promise<User[] | null> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM users WHERE emailUser = ? AND passwordUser = ?;',
                [email, pwd],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        const userArray: User[] = [];
                        for (let i = 0; i < rows.length; i++) {
                            userArray.push(rows.item(i));
                        }
                        console.log('User trouver', userArray);


                        resolve(userArray);
                    } else {
                        console.log('User non trouver');
                        resolve(null);
                    }
                },
                (_, error) => {
                    console.log('Failed to retrieve user ID:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
export const fetchAllUser = (): Promise<User[] | null> => {
    return new Promise((resolve, reject) => {
        db?.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM users;',
                [],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        const userArray: User[] = [];
                        for (let i = 0; i < rows.length; i++) {
                            userArray.push(rows.item(i));
                        }
                        console.log('User trouver', userArray);


                        resolve(userArray);
                    } else {
                        console.log('User non trouver');
                        resolve(null);
                    }
                },
                (_, error) => {
                    console.log('Failed to retrieve user ID:', error);
                    reject(error);
                    return false;
                }
            );
        });
    });
};
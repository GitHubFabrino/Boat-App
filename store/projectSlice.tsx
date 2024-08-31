
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import { createTables, insertProject, fetchProjects, deleteProjectFromDB, fetchUserById, insertUser, insertTache, fetchAllTacheByProject, insertMateriel, fetchAllMaterielByProject, insertMateriaux, fetchAllMateriauxByProject, insertPersonneTache, findOnePersonneTache, findOneTache, fetchProjectsById, updateTache, findTacheByIdProject, updateProjectProgress, findMaterielByIdMateriel, findMateriauxByIdMateriel, fetchAllUser, deleteMaterielFromDB, deleteMateriauxFromDB, updateMaterielInDb, updateMateriauxInDb, deleteMateriauxByIdProject, deleteMaterielByIdProject, deletePersonneByIdTache, deleteTacheByIdProject } from './database';
import { Project, Personnes, MaterielConst, MateriauxConst, ProjetConst, Materiaux, Materiel, UserToDb, Taches, MaterielConstNoId } from '@/app/(tabs)/BottomTab/Project.Interface';
import { setProfile } from './profileSlice';
import { dataMateriel, dataNewTache, dataMateriaux } from '@/app/(tabs)/BottomTab/dataNewProject';

interface ProjectState {
    projects: Project[];
}

const initialState: ProjectState = {
    projects: [],
};

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects(state, action: PayloadAction<Project[]>) {
            state.projects = action.payload;
        },
        startTask(state, action: PayloadAction<{ projectId: number; taskId: number; newPersonName: string }>) {
            const { projectId, taskId, newPersonName } = action.payload;
            const project = state.projects.find(proj => proj.id === projectId);
            if (project) {
                const task = project.tache.find(t => t.id === taskId);

                if (task) {
                    task.statusStart = 1;
                    task.dateStart = new Date().toLocaleDateString();

                    const newPerson: Personnes = {
                        idpersonne: 0,
                        nom: newPersonName,
                        prenom: '',
                        tacheId: taskId
                    };

                    if (!task.personne) {
                        task.personne = [];
                    }
                    task.personne.push(newPerson);
                }
            }
        },
        completeTask(state, action: PayloadAction<{ projectId: number; taskId: number }>) {
            const { projectId, taskId } = action.payload;
            const project = state.projects.find(proj => proj.id === projectId);
            if (project) {
                const task = project.tache.find(t => t.id === taskId);
                if (task) {
                    task.statusEnd = 1;
                    task.dateEnd = new Date().toLocaleDateString();
                    const totalTasks = project.tache.length;
                    console.log("totalTasks a:", totalTasks);

                    const completedTasks = project.tache.filter(t => t.statusEnd).length;
                    console.log("completedTasks a:", completedTasks);
                    project.progress = Math.round((completedTasks / totalTasks) * 100);
                    if (project.progress >= 100) {
                        project.progress = 100;
                        project.status = 'Finie';
                    }
                }
            }
        },
        ajouterMateriel(state, action: PayloadAction<{ projectId: number; newMateriel: MaterielConst }>) {
            const { projectId, newMateriel } = action.payload;
            const project = state.projects.find(proj => proj.id === projectId);
            if (project && newMateriel.imageMateriel && newMateriel.projectId) {
                const newMateriels: Materiel = {
                    id: newMateriel.idMateriel,
                    nomMateriel: newMateriel.nomMateriel,
                    nombreMateriel: newMateriel.nombreMateriel,
                    dateAjoutMateriel: new Date().toLocaleDateString(),
                    imageMateriel: newMateriel.imageMateriel,
                    projectId: newMateriel.projectId
                };
                if (!project.materiel) {
                    project.materiel = [];
                }
                project.materiel.push(newMateriels);
            }
        },
        ajouterMaterielImage(state, action: PayloadAction<{ projectId: number; newMateriel: Materiel }>) {
            const { projectId, newMateriel } = action.payload;
            const project = state.projects.find(proj => proj.id === projectId);
            const materiel = project?.materiel.find(m => m.id === newMateriel.id);

            if (materiel && newMateriel.imageMateriel) {
                materiel.imageMateriel = newMateriel.imageMateriel
            }

        },
        ajouterMateriauxImage(state, action: PayloadAction<{ projectId: number; newMateriaux: Materiaux }>) {
            const { projectId, newMateriaux } = action.payload;
            const project = state.projects.find(proj => proj.id === projectId);
            const materiaux = project?.materiaux.find(m => m.id === newMateriaux.id);

            if (materiaux && newMateriaux.imageMateriaux) {
                materiaux.imageMateriaux = newMateriaux.imageMateriaux
            }

        },
        supprimerMateriel(state, action: PayloadAction<{ projectId: number; idMateriel: number }>) {
            const { projectId, idMateriel } = action.payload;
            const project = state.projects.find(proj => proj.id === projectId);
            if (project) {
                project.materiel = project.materiel.filter(m => m.id !== idMateriel);
            }
        },
        supprimerMateriaux(state, action: PayloadAction<{ projectId: number; idMateriaux: number }>) {
            const { projectId, idMateriaux } = action.payload;
            const project = state.projects.find(proj => proj.id === projectId);
            if (project) {
                project.materiaux = project.materiaux.filter(m => m.id !== idMateriaux);
            }
        },
        ajouterMateriaux(state, action: PayloadAction<{ projectId: number; newMateriaux: MateriauxConst }>) {
            const { projectId, newMateriaux } = action.payload;
            const project = state.projects.find(proj => proj.id === projectId);
            if (project && newMateriaux.imageMateriaux && newMateriaux.projectId) {
                const newMateriauxx: Materiaux = {
                    id: newMateriaux.id,
                    nomMateriaux: newMateriaux.nomMateriaux,
                    nombreMateriaux: newMateriaux.nombreMateriaux,
                    dateAjoutMateriaux: new Date().toLocaleDateString(),
                    imageMateriaux: newMateriaux.imageMateriaux,
                    projectId: newMateriaux.projectId

                };
                if (!project.materiaux) {
                    project.materiaux = [];
                }
                project.materiaux.push(newMateriauxx);
            }
        },
        ajoutProjet(state, action: PayloadAction<{ newProject: Project }>) {
            const { newProject } = action.payload;
            if (!state.projects) {
                state.projects = [];
            }
            state.projects.push(newProject);
        },
        deleteProject(state, action: PayloadAction<number>) {
            state.projects = state.projects.filter(project => project.id !== action.payload);
        },

    },
});

export const { setProjects, startTask, ajouterMaterielImage, completeTask, ajoutProjet, ajouterMateriauxImage, supprimerMateriaux, deleteProject, ajouterMateriel, ajouterMateriaux, supprimerMateriel } = projectSlice.actions;

export const initializeDatabase = (): AppThunk => async dispatch => {
    createTables();
};

export const loadProjects = (userId: number): AppThunk => async dispatch => {
    try {
        const projects = await fetchProjects(userId);
        console.log('projects : ', projects); // Ajoutez ceci pour vérifier les données récupérées
        dispatch(setProjects(projects));
    } catch (error) {
        console.error('Failed to load projects from database', error);
    }
};





export const insertUserDb = (user: UserToDb): AppThunk => async dispatch => {
    try {
        await insertUser(user);
        console.log('User inserted successfully');
        const allUser = await fetchAllUser()
        if (allUser) {
            dispatch(setProfile(allUser))
        }
    } catch (error) {
        console.error('Failed to insert user:', error);
    }
};

export const findOneTacheToDb = (tacheId: number): AppThunk => async dispatch => {
    try {
        await findOneTache(tacheId);
        console.log('User inserted successfully');
    } catch (error) {
        console.error('Failed to insert user:', error);
    }
};


export const starkTaskToDb = (projectId: number, taskId: number, newPersonName: string): AppThunk => async dispatch => {
    try {
        //const project = state.projects.find(proj => proj.id === projectId);
        const projectTodb = await fetchProjectsById(projectId)
        if (projectTodb) {
            //const task = project.tache.find(t => t.id === taskId);
            const taskToDb = await findOneTache(taskId)
            console.log("Data Tache avant : ", taskToDb);

            if (taskToDb) {
                if (projectTodb[0].id == taskToDb[0].projectId) {


                    const newPerson: Personnes = {
                        idpersonne: 0,
                        nom: newPersonName,
                        prenom: '',
                        tacheId: taskId
                    };
                    const insertIdPersonne = await insertPersonneTache(newPerson, taskId)
                    const personneInsert = await findOnePersonneTache(insertIdPersonne)
                    const updateTacheData: Taches = {
                        id: taskToDb[0].id,
                        titre: taskToDb[0].titre,
                        description: taskToDb[0].description,
                        statusStart: 1,
                        statusEnd: taskToDb[0].statusEnd,
                        dateStart: new Date().toLocaleDateString(),
                        dateEnd: taskToDb[0].dateEnd,
                        personne: personneInsert,
                        projectId: projectTodb[0].id
                    }
                    console.log("Data Tache avant enregistrement: ", updateTacheData);
                    await updateTache(updateTacheData)
                    const taskToDbafter = await findOneTache(taskId)
                    console.log("Data Tache apres enregistrement : ", taskToDbafter);
                    dispatch(startTask({ projectId, taskId, newPersonName }));

                }
            }
        }
    } catch (error) {
        console.error('Failed to insert user:', error);
    }
};

export const completeTaskToDb = (projectId: number, taskId: number): AppThunk => async dispatch => {
    try {
        //const project = state.projects.find(proj => proj.id === projectId);
        const projectTodb = await fetchProjectsById(projectId)
        if (projectTodb) {
            //const task = project.tache.find(t => t.id === taskId);
            const taskToDb = await findOneTache(taskId)
            console.log("Data Tache avant : ", taskToDb);

            if (taskToDb) {
                if (projectTodb[0].id == taskToDb[0].projectId) {


                    const updateTacheData: Taches = {
                        id: taskToDb[0].id,
                        titre: taskToDb[0].titre,
                        description: taskToDb[0].description,
                        statusStart: taskToDb[0].statusStart,
                        statusEnd: 1,
                        dateStart: taskToDb[0].dateStart,
                        dateEnd: new Date().toLocaleDateString(),
                        personne: taskToDb[0].personne,
                        projectId: projectTodb[0].id
                    }
                    console.log("Data Tache avant enregistrement: ", updateTacheData);
                    const updateTa = await updateTache(updateTacheData)

                    const allTachesByProject = await findTacheByIdProject(projectTodb[0].id)

                    if (allTachesByProject) {

                        const totalTasks = allTachesByProject.length;
                        console.log("Total task :", totalTasks);
                        const completedTasks = allTachesByProject.filter(t => t.statusEnd == 1).length;
                        console.log("completetask :", completedTasks);


                        let actProgress = Math.round((completedTasks / totalTasks) * 100);
                        console.log("Pourcentage 1:", actProgress);



                        let projectStatus
                        if (actProgress >= 100) {
                            actProgress = 100;
                            projectStatus = 'Finie';
                        } else {
                            actProgress = actProgress
                            projectStatus = 'Encours';
                        }
                        console.log("status :", projectStatus);
                        console.log("Pourcentage 2:", actProgress);

                        const Dbproject = await fetchProjectsById(projectId)
                        console.log("Project in db 3: ", Dbproject);


                        const updateProjectData = {
                            id: projectId,
                            userId: Dbproject[0].userId,
                            name: Dbproject[0].name,
                            progress: actProgress,
                            status: projectStatus,
                            description: Dbproject[0].description,
                            startDate: Dbproject[0].startDate,
                            endDate: Dbproject[0].endDate,
                            mesure: Dbproject[0].mesure
                        }
                        console.log("Project after before eee: ", updateProjectData);

                        await updateProjectProgress(updateProjectData)
                        const projectTodb = await fetchProjectsById(projectId)
                        console.log("Project after update : ", projectTodb);

                    }


                    const taskToDbafter = await findOneTache(taskId)
                    console.log("Data Tache apres enregistrement : ", taskToDbafter);
                    dispatch(completeTask({ projectId, taskId }));

                }
            }
        }
    } catch (error) {
        console.error('Failed to insert user:', error);
    }
};
export const addProject = (newProject: ProjetConst, userId: number): AppThunk => async dispatch => {

    try {

        let UserId = await fetchUserById(userId);

        if (UserId !== null) {

            const project: Project = {
                id: 0,
                name: newProject.name,
                description: newProject.description,
                startDate: newProject.startDate,
                endDate: newProject.endDate,
                mesure: newProject.mesure,
                progress: 0,
                status: "Encours",
                tache: [],
                materiel: [],
                materiaux: [],
                userId: UserId
            };

            const insertIdProject = await insertProject(project, userId);

            for (let i = 0; i < dataNewTache.length; i++) {
                const newTache = dataNewTache[i];
                newTache.projectId = insertIdProject
                let insertIdtaches = await insertTache(newTache, insertIdProject)

            }

            for (let i = 0; i < dataMateriel.length; i++) {
                const newMateriel = dataMateriel[i];
                newMateriel.projectId = insertIdProject
                let insertIdMateriel = await insertMateriel(newMateriel, insertIdProject)
                newMateriel.id = insertIdMateriel

            }

            for (let i = 0; i < dataMateriaux.length; i++) {

                const newMateriaux = dataMateriaux[i];
                if (newProject != null && newProject.mesure) {
                    if (newMateriaux.nomMateriaux == "Planches") {
                        if (newProject?.mesure <= 8) {
                            newMateriaux.nombreMateriaux = "50 à 60 planches de 4m"
                        } else {
                            newMateriaux.nombreMateriaux = "100 planches de 4m"
                        }
                    } else {
                        newMateriaux.nombreMateriaux = ""
                    }

                }


                newMateriaux.projectId = insertIdProject
                let insertIdMateriaux = await insertMateriaux(newMateriaux, insertIdProject)
                newMateriaux.id = insertIdMateriaux

            }

            let taches = await fetchAllTacheByProject(insertIdProject)
            console.log('new tache ', taches);
            let materiels = await fetchAllMaterielByProject(insertIdProject)
            console.log('new tache ', materiels);
            let materiaux = await fetchAllMateriauxByProject(insertIdProject)
            console.log('new tache ', materiaux);
            project.id = insertIdProject;
            project.tache = taches
            project.materiel = materiels
            project.materiaux = materiaux
            dispatch(ajoutProjet({ newProject: project }));
        }
    } catch (error) {
        console.error('Failed to add project:', error);
    }
};




export const removeProject = (projectId: number): AppThunk => async dispatch => {
    try {
        await deleteProjectFromDB(projectId);
        await deleteMateriauxByIdProject(projectId)
        await deleteMaterielByIdProject(projectId)

        const allTache = await fetchAllTacheByProject(projectId)
        for (let i = 0; i < allTache.length; i++) {
            await deletePersonneByIdTache(allTache[i].id)
        }
        await deleteTacheByIdProject(projectId)
        dispatch(deleteProject(projectId));
    } catch (error) {
        console.error('Failed to delete project from database', error);
    }
};



export const removeMateriel = (idMateriel: number, idProject: number, UserId: number): AppThunk => async dispatch => {
    try {
        console.log("ID Materiel Delete : ", idMateriel);

        await deleteMaterielFromDB(idMateriel);
        dispatch(supprimerMateriel({ projectId: idProject, idMateriel: idMateriel }))
    } catch (error) {
        console.error('Failed to delete project from database', error);
    }
};

export const removeMateriaux = (idMateriaux: number, idProject: number, UserId: number): AppThunk => async dispatch => {
    try {
        console.log("ID Materiaux Delete : ", idMateriaux);

        await deleteMateriauxFromDB(idMateriaux);
        dispatch(supprimerMateriaux({ projectId: idProject, idMateriaux: idMateriaux }))
    } catch (error) {
        console.error('Failed to delete project from database', error);
    }
};


export default projectSlice.reducer;

export const selectProjectById = (state: { projects: ProjectState }, projectId: number) =>
    state.projects.projects.find(proj => proj.id === projectId);

export const addMaterielToDb = (projectId: number, newMateriel: MaterielConstNoId): AppThunk => async dispatch => {
    try {
        //const project = state.projects.find(proj => proj.id === projectId);
        const projectTodb = await fetchProjectsById(projectId)
        if (projectTodb && newMateriel.imageMateriel) {
            const MaterielNew: Materiel = {

                id: 0,
                nomMateriel: newMateriel.nomMateriel,
                nombreMateriel: newMateriel.nombreMateriel,
                imageMateriel: newMateriel.imageMateriel,
                dateAjoutMateriel: new Date().toLocaleDateString(),
                projectId: projectId
            }

            const materielInsertDb = await insertMateriel(MaterielNew, projectId)
            console.log("Materiel new ID : ", materielInsertDb);
            const materielDb = await findMaterielByIdMateriel(materielInsertDb)
            console.log("Materiel new from db : ", materielDb);
            const materielFromDb = {
                idMateriel: materielInsertDb,
                nomMateriel: materielDb[0].nomMateriel,
                nombreMateriel: materielDb[0].nombreMateriel,
                imageMateriel: materielDb[0].imageMateriel,
                dateAjoutMateriel: materielDb[0].dateAjoutMateriel,
                projectId: materielDb[0].projectId
            }
            materielDb[0].id = materielInsertDb
            dispatch(ajouterMateriel({ projectId: projectId, newMateriel: materielFromDb }))
        }
    } catch (error) {
        console.error('Failed to insert user:', error);
    }
};
export const addMaterielImageToDb = (IdMateriel: number, newMateriel: MaterielConstNoId): AppThunk => async dispatch => {
    try {
        const materielDb = await findMaterielByIdMateriel(IdMateriel)
        console.log("Materiel new from db : ", materielDb);

        if (materielDb[0] && newMateriel.imageMateriel) {
            const UpdateMateriel: Materiel = {

                id: materielDb[0].id,
                nomMateriel: materielDb[0].nomMateriel,
                nombreMateriel: newMateriel.nombreMateriel,
                imageMateriel: newMateriel.imageMateriel,
                dateAjoutMateriel: materielDb[0].dateAjoutMateriel,
                projectId: materielDb[0].projectId
            }
            const materielInsertDb = await updateMaterielInDb(UpdateMateriel)
            dispatch(ajouterMaterielImage({ projectId: materielDb[0].projectId, newMateriel: UpdateMateriel }))

        }
    } catch (error) {
        console.error('Failed to insert user:', error);
    }
};

export const addMateriauxImageToDb = (IdMateriaux: number, newMateriaux: MateriauxConst): AppThunk => async dispatch => {
    try {
        const materiauxDb = await findMateriauxByIdMateriel(IdMateriaux)
        console.log("Materiel new from db : ", materiauxDb);

        if (materiauxDb[0] && newMateriaux.imageMateriaux) {
            const UpdateMateriaux: Materiaux = {

                id: materiauxDb[0].id,
                nomMateriaux: materiauxDb[0].nomMateriaux,
                nombreMateriaux: newMateriaux.nombreMateriaux,
                imageMateriaux: newMateriaux.imageMateriaux,
                dateAjoutMateriaux: materiauxDb[0].dateAjoutMateriaux,
                projectId: materiauxDb[0].projectId
            }
            const materiauxInsertDb = await updateMateriauxInDb(UpdateMateriaux)
            dispatch(ajouterMateriauxImage({ projectId: materiauxDb[0].projectId, newMateriaux: UpdateMateriaux }))

        }
    } catch (error) {
        console.error('Failed to insert user:', error);
    }
};

export const addMateriauxToDb = (projectId: number, newMateriaux: MateriauxConst): AppThunk => async dispatch => {
    try {
        //const project = state.projects.find(proj => proj.id === projectId);
        const projectTodb = await fetchProjectsById(projectId)
        if (projectTodb && newMateriaux.imageMateriaux) {
            const MateriauxNew: Materiaux = {
                id: 0,
                nomMateriaux: newMateriaux.nomMateriaux,
                nombreMateriaux: newMateriaux.nombreMateriaux,
                imageMateriaux: newMateriaux.imageMateriaux,
                dateAjoutMateriaux: new Date().toLocaleDateString(),
                projectId: projectId
            }

            const materiauInsertDb = await insertMateriaux(MateriauxNew, projectId)
            console.log("Materiaux new ID : ", materiauInsertDb);
            const materiauxDb = await findMateriauxByIdMateriel(materiauInsertDb)
            console.log("Materiaux new from db : ", materiauxDb);
            dispatch(ajouterMateriaux({ projectId: projectId, newMateriaux: materiauxDb[0] }))
        }
    } catch (error) {
        console.error('Failed to insert user:', error);
    }
};
namespace App {
    // Project State Management
type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listernerFn: Listener<T>) {
        this.listeners.push(listernerFn)
    }
}

export class ProjectState extends State<Project>{
    private projects: Project[] = [];
    private static instance: ProjectState;
    private constructor() {
        super();
    }

    static getInstance() {
        if(ProjectState.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(), 
            title, 
            description, 
            numOfPeople,
            ProjectStatus.Active
            );
        this.projects.push(newProject);
        this.updateListerners();
    }    

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if(project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListerners();
        }
    }

    private updateListerners () {
        for(const listernerFn of this.listeners){
            listernerFn(this.projects.slice());
        }
    }


}

export const projectState = ProjectState.getInstance();

}
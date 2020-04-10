import React from "react";
import ProjectForm from './ProjectForm';
import ProjectPanel from './ProjectPanel';
import axios from "axios";
import { isAuthenticated } from "../validation";
import 'bootstrap/dist/css/bootstrap.min.css';


export default class ProjectList extends React.Component {

    state = {
        projects: [],
        currentProject: "",
        panel: ""
    }

    componentDidMount() {
        this.getProjects();
    }

    getProjects = async () => {
        const result = await axios.get('http://localhost:4000/projects' ,
        { params: { 'access-token': localStorage.getItem('access-token') } });
        this.setState({
            projects: result.data,
            panel: ""
        })
    }

    deleteProject = async (id) => {
        await axios.delete("http://localhost:4000/projects/" + id);
        this.getProjects();
    }

    addProject = () => {
        this.setState({
            panel: <ProjectForm getProjects={this.getProjects} />
        })
    }

    updateProject = async (id, newProject) => {
        await axios.put('http://localhost:4000/projects/' + id, newProject);
        this.getProjects();
        this.showProject(id);
    }

    showProject = async (id) => {
        const result = await axios.get('http://localhost:4000/projects/' + id, 
        { params: { 'access-token': localStorage.getItem('access-token') } });
        this.setState({
            currentProject: result.data,
            panel: <ProjectPanel project={result.data} showProject={this.showProject}
                deleteProject={this.deleteProject} updateProject={this.updateProject} />
        })
    }


    render() {
        return (
            <div>
                {
                    (isAuthenticated()) ? (<div  id="panel" className="container row m-3">
                        <div id="menu-projects" className="col-3">
                        <div className="row text-general">
                            <h1>Projects</h1>
                            <button className="btn btn-success m-2" onClick={() => this.addProject()}>
                                Add project
                            </button>
                        </div>

                        <div className=" mt-4">
                            <ul className="list-group">
                                {
                                    this.state.projects.map((p) => (
                                        <li className="list-group-item d-flex justify-content-between align-items-center" key={p.id} onClick={() => this.showProject(p.id)}>
                                            <div>
                                                <img src="project_icon.png" alt="project" width="15" height="15" className="mr-2" />
                                                {p.title}
                                            </div>

                                            <span className="badge badge-primary badge-pill">{}</span>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                        </div>

                        <div className="ml-2">
                            {this.state.panel}
                        </div>
                    </div>) : (<h3>Please login</h3>)
                }

            </div>
        )
    }
}
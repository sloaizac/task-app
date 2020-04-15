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
        const result = await axios.get('http://localhost:4000/projects',
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
            <div className="container-fluid">
                {
                    (isAuthenticated()) ? (<div>
                        <div className="row text-general bar">
                            <button className="btn btn-success m-2" onClick={() => this.addProject()}>
                                Add project
                            </button>

                            <div className="dropdown m-2">
                                <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Projects list
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    {
                                        this.state.projects.map((p) => (
                                            <div className="dropdown-item" key={p.id} onClick={() => this.showProject(p.id)}>
                                                {p.title}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="ml-2">
                            {this.state.panel}
                        </div>
                    </div>
                    ) : (<h3>Please login</h3>)
                }

            </div>
        )
    }
}
import React, { useState } from 'react'
import ModalButton from '../partials/components/ModalButton'
import { useProject } from '../contexts/ProjectContext'
import Modal from '../partials/sections/Modal'

const Projects = () => {
  const {
    projects,
    getProjects,
    users,
    getUsers,
    clients,
    getClients,
    projectStatuses,
    getProjectStatuses,
    createProject,
    updateProject,
    deleteProject,
  } = useProject()

  // AI-genererad kod start

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  
  const [formValues, setFormValues] = useState({
    imageFile: null,
    projectName: "",
    clientId: "",
    description: "",
    startDate: "",
    endDate: "",
    userId: "",
    budget: "",
    projectStatusId: ""
  })

  const closeModal = () => {
    setIsModalOpen(false)
    setIsEditing(false)
    setSelectedProject(null)
    setFormValues({
      imageFile: null,
      projectName: "",
      clientId: "",
      description: "",
      startDate: "",
      endDate: "",
      userId: "",
      budget: "",
      projectStatusId: ""
    })
  }
  
  const openAddModal = () => {
    setIsEditing(false)
    setSelectedProject(null)
    setIsModalOpen(true)
  }
  
  const openEditModal = (project) => {
    setIsEditing(true)
    setSelectedProject(project)
    setFormValues({
      imageFile: null,
      projectName: project.projectName || "",
      clientId: project.client?.id || "",
      description: project.description || "",
      startDate: project.startDate?.split("T")[0] || "",
      endDate: project.endDate?.split("T")[0] || "",
      userId: project.user?.id || "",
      budget: project.budget || "",
      projectStatusId: project.status?.id || ""
    })
    setIsModalOpen(true)
  }

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const formData = new FormData()
    for (const [key, value] of Object.entries(formValues)) {
      if (value !== null && value !== "") {
        formData.append(key, value)
      }
    }
  
    if (isEditing) {
      formData.append("id", selectedProject.id)
      formData.append("existingImageFileName", selectedProject.imageFileName || "")
      await updateProject(selectedProject.id, formData)
    } else {
      await createProject(formData)
    }
  
    closeModal()
  }
  
  
  // AI-genererad kod slut

  return (
    <div id="projects">
      <div className="page-header">
        <h1 className="h2">Projects</h1>
        <ModalButton type="add" onClick={openAddModal} text="Add Project" />
      </div>

      <div>
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.projectName}</h3>
            <button onClick={() => openEditModal(project)}>Edit</button>
          </div>
        ))}
      </div>

        {/* Formulärets grund är AI-genererat, men justerat */}
      <Modal isOpen={isModalOpen} title={isEditing ? "Edit Project" : "Add Project"} onClose={closeModal}>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor='imageFile'>Image</label>
            <input type="file" id='imageFile' name="imageFile" onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor='projectName'>Project Name</label>
            <input type="text" id='projectName' name="projectName" value={formValues.projectName} onChange={handleChange} placeholder="Enter Project Name" required />
          </div>

          <div className="form-group">
            <label htmlFor='clientId'>Client Name</label>
            <select id='clientId' name="clientId" value={formValues.clientId} onChange={handleChange} required>
              <option value="" disabled hidden>Select Client Name</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.clientName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor='description'>Description</label>
            <textarea id='description' name="description" value={formValues.description} onChange={handleChange} placeholder="Type something" />
          </div>

          <div className="form-group">
            <label htmlFor='startDate'>Start Date</label>
            <input type="date" id='startDate' name="startDate" value={formValues.startDate} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor='endDate'>End Date</label>
            <input type="date" id='endDate' name="endDate" value={formValues.endDate} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor='userId'>Project Owner</label>
            <select id='userId' name="userId" value={formValues.userId} onChange={handleChange} required>
              <option value="" disabled hidden>Select Project Owner</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor='budget'>Budget</label>
            <input type="number" id='budget' name="budget" value={formValues.budget} onChange={handleChange} placeholder="0" step="0.01" />
          </div>

          {isEditing &&
          <div className="form-group">
            <label htmlFor='projectStatusId'>Project Status</label>
            <select id='projectStatusId' name="projectStatusId" value={formValues.projectStatusId} onChange={handleChange} required>
              <option value="" disabled hidden>Status</option>
              {projectStatuses.map(status => (
                <option key={status.id} value={status.id}>
                  {status.statusName}
                </option>
              ))}
            </select>
          </div>}

          <button type="submit" className="btn">{isEditing ? 'Save' : 'Create'}</button>
        
        </form>
      </Modal>
    </div>
  )
}

export default Projects

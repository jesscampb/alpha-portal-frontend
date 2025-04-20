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

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)  // Det projekt som redigeras

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProject(null)  // Reset projektdata när modalen stängs
  }

  const openAddModal = () => {
    setIsEditing(false)
    setIsModalOpen(true)
  }

  const openEditModal = (project) => {
    setIsEditing(true)
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // Så inte sidan laddas om
    const data = new FormData(e.target)
    if (isEditing) {
      await updateProject(selectedProject.id, data)
    } else {
      await createProject(data)
    }
    closeModal()
  }

  return (
    <div id="projects">
      <div className="page-header">
        <h1 className="h2">Projects</h1>
        {/* Knappen för att öppna modalen för att lägga till projekt */}
        <ModalButton type="add" onClick={openAddModal} text="Add Project" />
      </div>

      {/* Lista av projekt */}
      <div>
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <h3>{project.projectName}</h3>
            {/* Dropdown för att öppna edit modal */}
            <button onClick={() => openEditModal(project)}>Edit</button>
            {/* Du kan även lägga till en Delete-knapp här om du vill */}
          </div>
        ))}
      </div>

      {/* Modal för Add eller Edit Project */}
      <Modal isOpen={isModalOpen} title={isEditing ? "Edit Project" : "Add Project"} onClose={closeModal}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input name="title" defaultValue={isEditing ? currentProject.title : ''} required />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" defaultValue={isEditing ? currentProject.description : ''} />
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input type="date" name="startDate" defaultValue={isEditing ? currentProject.startDate : ''} />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input type="date" name="endDate" defaultValue={isEditing ? currentProject.endDate : ''} />
          </div>

          <div className="form-group">
            <label>Client</label>
            <select name="clientId" defaultValue={isEditing ? currentProject.clientId : ''}>
              <option value="">Välj en klient</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="statusId" defaultValue={isEditing ? currentProject.statusId : ''}>
              <option value="">Välj en status</option>
              {projectStatuses.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Owner</label>
            <select name="ownerId" defaultValue={isEditing ? currentProject.ownerId : ''}>
              <option value="">Välj en användare</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn">{isEditing ? 'Update Project' : 'Create Project'}</button>
        </form>
      </Modal>
    </div>
  )
}

export default Projects

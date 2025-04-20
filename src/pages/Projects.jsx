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

  const closeModal = () => { setIsModalOpen(false) }
  const openModal = () => { setIsModalOpen(true) }





  return (
    <div id="projects">
      <div className="page-header">
        <h1 className="h2">Projects</h1>
        <ModalButton type="add" target="#addProjectModal" text="Add Project" />
      </div>
      <Modal isOpen={isModalOpen} title="Add Project" onClose={closeModal}>
        <form action=""></form>
      </Modal>
    </div>
  )
}

export default Projects
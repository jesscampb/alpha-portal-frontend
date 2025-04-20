import React, {createContext, useContext, useState, useEffect} from 'react'
import { useAuth } from './AuthContext'

const ProjectContext = createContext()
export const useProject = () => useContext(ProjectContext)

export const ProjectProvider = ({children}) => {
  const {apiKey} = useAuth()

  const apiUri = import.meta.env.VITE_API_URI
  const [projects, setProjects] = useState([])
  const [users, setUsers] = useState([])
  const [clients, setClients] = useState([])
  const [projectStatuses, setProjectStatuses] = useState([])

  const projectData = {
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
  }

  const getProjects = async () => {
    try {
      const res = await fetch(`${apiUri}/projects`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        }
      })

      if (res.ok) {
        const data = await res.json()
        setProjects(data)
      }
    } catch (error) {
      console.log('Error fetching projects:', error)
    }
  }

  const getClients = async () => {
    try {
      const res = await fetch(`${apiUri}/clients`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        }
      })

      if (res.ok) {
        const data = await res.json()
        setClients(data)
      }
    } catch (error) {
      console.log('Error fetching clients:', error)
    }
  }

  const getUsers = async () => {
    try {
      const res = await fetch(`${apiUri}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        }
      })

      if (res.ok) {
        const data = await res.json()
        setUsers(data)
      }
    } catch (error) {
      console.log('Error fetching users:', error)
    }
  }

  const getProjectStatuses = async () => {
    try {
      const res = await fetch(`${apiUri}/projectStatuses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey
        }
      })

      if (res.ok) {
        const data = await res.json()
        setProjectStatuses(data)
      }
    } catch (error) {
      console.log('Error fetching project statuses:', error)
    }
  }

  const createProject = async (formData) => {
    try {
      const res = await fetch(`${apiUri}/projects`, {
        method: 'POST',
        headers: {
          'X-API-Key': apiKey
        },
        body: formData
      })

      if (res.ok) {
        getProjects()
        console.log('Project created successfully')
      }
    } catch (error) {
      console.log('Error creating project:', error)
    }
  }

  const updateProject = async (id, formData) => {
    try {
      const res = await fetch(`${apiUri}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'X-API-Key': apiKey
        },
        body: formData
      })

      if (res.ok) {
        await getProjects()
        console.log('Project updated successfully')
      }
    } catch (error) {
      console.log('Error updating project:', error)
    }
  }

  const deleteProject = async (id) => {
    try {
      const res = await fetch(`${apiUri}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'X-API-Key': apiKey
        }
      })

      if (res.ok) {
        await getProjects()
        console.log('Project deleted successfully')
      }
    }
    catch (error) {
      console.log('Error deleting project:', error)
    }
  }

  useEffect(() => {
    getProjects()
    getUsers()
    getClients()
    getProjectStatuses()
  }, [])

  return (
    <ProjectContext.Provider value={projectData}>
        {children}
    </ProjectContext.Provider>
  )
}

export default ProjectContext
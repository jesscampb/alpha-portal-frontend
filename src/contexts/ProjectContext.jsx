import React, {createContext} from 'react'
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
  const [loading, setLoading] = useState(false)

  projectData = {
    projects,
    getProjects,
    users,
    getUsers,
    clients,
    getClients,
    projectStatuses,
    getProjectStatuses
  }

  const getProjects = async () => {
    try {
      const res = await fetch(`${apiuri}/projects`, {
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
      const res = await fetch(`${apiuri}/clients`, {
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
      const res = await fetch(`${apiuri}/users`, {
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
      const res = await fetch(`${apiuri}/projectStatuses`, {
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


  return (
    <ProjectContext.Provider value={projectData}>
        {children}
    </ProjectContext.Provider>
  )
}

export default ProjectContext
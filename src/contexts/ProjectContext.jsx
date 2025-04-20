import React, {createContext} from 'react'
import { useAuth } from './AuthContext'

const ProjectContext = createContext()
export const useProject = () => useContext(ProjectContext)

export const ProjectProvider = ({children}) => {
  const {apiKey} = useAuth()

  const apiUri = `${import.meta.env.VITE_API_URI}/projects`
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  projectData = {
    projects,
    getProjects
  }

  const getProjects = async () => {
    setLoading(true)
    try {
      const res = await fetch(apiuri, {
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
    setLoading(false)
  }

  return (
    <ProjectContext.Provider value={projectData}>
        {children}
    </ProjectContext.Provider>
  )
}

export default ProjectContext
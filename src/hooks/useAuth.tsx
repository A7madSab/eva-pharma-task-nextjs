import { useContext } from "react"
import AuthContext from "src/context/Auth"

const useAuth = () => useContext(AuthContext)

export default useAuth

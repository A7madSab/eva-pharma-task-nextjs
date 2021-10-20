import { createContext, useEffect, useReducer } from "react"
import Loader from "src/components/Loader"
import axios from "src/utils/axios"

const initialAuthState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
}

interface User {
  email: string
}

const setSession = ({ jwt, user }: { jwt: string; user: User }) => {
  if (jwt) {
    localStorage.setItem("accessToken", jwt)
    localStorage.setItem("user", JSON.stringify(user))
    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`
  } else {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("user")
    delete axios.defaults.headers.common.Authorization
  }
}

export const deleteSession = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("user")
  delete axios.defaults.headers.common.Authorization
}

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "INITIALISE": {
      const { isAuthenticated, user } = action.payload

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      }
    }
    case "LOGIN": {
      const { user } = action.payload
      return {
        ...state,
        isAuthenticated: true,
        user,
      }
    }
    case "LOGOUT": {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      }
    }
    default: {
      return { ...state }
    }
  }
}

const AuthContext = createContext({
  ...initialAuthState,
  // eslint-disable-next-line no-unused-vars
  login: ({ email, password }: { email: string; password: string }) => Promise.resolve(),
  logout: () => Promise.resolve(),
})

export const AuthProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState)

  const login = async ({ email, password }: { email: string; password: string }) => {
    const { data }: { data: { token: string } } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, { Email: email, Password: password })

    const user = { email }
    setSession({ jwt: data.token, user })
    dispatch({ type: "LOGIN", payload: { user } })
  }

  const logout = () => {
    deleteSession()
    dispatch({ type: "LOGOUT" })
  }

  useEffect(() => {
    const initialise = async () => {
      try {
        const jwt = window.localStorage.getItem("accessToken")
        const userJSON = window.localStorage.getItem("user")
        const user = await JSON.parse(userJSON || "")
        setSession({ user, jwt: jwt || "" })

        if (jwt) {
          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: true,
              user,
            },
          })
        } else {
          dispatch({
            type: "INITIALISE",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          })
        }
      } catch (err) {
        console.error(err)
        dispatch({
          type: "INITIALISE",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      }
    }

    initialise()
  }, [])

  if (!state.isInitialised) {
    return <Loader />
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

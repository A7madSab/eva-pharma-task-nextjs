import { NextPage } from "next"
import { useEffect } from "react"
import { useRouter } from "next/router"
import useAuth from "src/hooks/useAuth"
import Loader from "src/components/Loader"

const withNotAuth = (Component: NextPage<any>) => {
  const Auth = ({ ...props }) => {
    const { isAuthenticated, isInitialised } = useAuth()
    const { push } = useRouter()

    useEffect(() => {
      if (isInitialised && isAuthenticated) {
        push("/country")
      }
    }, [isAuthenticated, isAuthenticated])

    return isAuthenticated ? <Loader /> : <Component {...props} />
  }

  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps
  }

  return Auth
}

export default withNotAuth

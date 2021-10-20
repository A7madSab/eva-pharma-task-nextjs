import type { NextPage } from "next"
import { Formik } from "formik"
import * as Yup from "yup"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import AuthLayout from "src/layouts/AuthLayout"
import useAuth from "src/hooks/useAuth"
import isAuth from "src/guard/withNotAuth"

const Home: NextPage = () => {
  const { login } = useAuth()

  const handleFormSubmit = async (values: any) => {
    try {
      await login({ email: values.email, password: values.password })
    } catch (err) {
      console.log("err", err)
    }
  }

  return (
    <AuthLayout>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email("Enter Correct Email.").required(),
          password: Yup.string().required(),
        })}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
          return (
            <form noValidate onSubmit={handleSubmit}>
              {/* email */}
              <Box pb={1}>
                <TextField value={values.email} fullWidth name="email" disabled={isSubmitting} onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="Email" variant="outlined" />
                {touched.email && errors.email && <Typography style={{ color: "red", fontSize: "12px" }}>{errors.email}</Typography>}
              </Box>

              {/* password */}
              <Box pb={1}>
                <TextField value={values.password} fullWidth name="password" disabled={isSubmitting} onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="password" variant="outlined" />
                {touched.password && errors.password && <Typography style={{ color: "red", fontSize: "12px" }}>{errors.password}</Typography>}
              </Box>

              <Button type="submit" variant="contained">
                Login
              </Button>
            </form>
          )
        }}
      </Formik>
    </AuthLayout>
  )
}

export default isAuth(Home)

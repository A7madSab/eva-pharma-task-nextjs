import type { NextPage } from "next"
import { Formik } from "formik"
import { useRouter } from "next/router"
import * as Yup from "yup"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import HomeLayout from "src/layouts/HomeLayout"
import withAuth from "src/guard/withAuth"
import { addCountries } from "src/API"

const add: NextPage = () => {
  const { push } = useRouter()

  const handleAddCountry = async (values: any) => {
    addCountries({ country: values.country })
    push("/country")
  }

  return (
    <HomeLayout>
      <Formik
        onSubmit={handleAddCountry}
        initialValues={{
          country: "",
        }}
        validationSchema={Yup.object().shape({
          country: Yup.string().required(),
        })}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
          return (
            <form noValidate onSubmit={handleSubmit}>
              {/* country */}
              <Box pb={1}>
                <TextField value={values.country} fullWidth name="country" disabled={isSubmitting} onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="country" variant="outlined" />
                {touched.country && errors.country && <Typography style={{ color: "red", fontSize: "12px" }}>{errors.country}</Typography>}
              </Box>

              <Button type="submit" variant="contained">
                Add Country
              </Button>
            </form>
          )
        }}
      </Formik>
    </HomeLayout>
  )
}

export default withAuth(add)

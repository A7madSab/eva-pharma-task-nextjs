import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Formik } from "formik"
import * as Yup from "yup"

import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import HomeLayout from "src/layouts/HomeLayout"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import withAuth from "src/guard/withAuth"
import { getCountrybyId } from "src/API"
import { Country } from "src/types"

const view: NextPage = () => {
  const { query } = useRouter()
  const { id } = query
  const [country, setCountry] = useState<Country | null>(null)

  useEffect(() => {
    ;(async () => {
      if (id) setCountry(await getCountrybyId({ id }))
    })()
  }, [id])

  const handleAddCity = () => {}

  return (
    <HomeLayout>
      <Box pb={1}>
        <TextField value={country?.name} fullWidth name="country" disabled id="outlined-basic" variant="outlined" />
      </Box>

      <Formik
        onSubmit={handleAddCity}
        initialValues={{
          city: "",
        }}
        validationSchema={Yup.object().shape({
          city: Yup.string().required(),
        })}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
          return (
            <form noValidate onSubmit={handleSubmit}>
              {/* city */}
              <Box pb={1}>
                <TextField value={values.city} fullWidth name="city" disabled={isSubmitting} onChange={handleChange} onBlur={handleBlur} id="outlined-basic" label="city" variant="outlined" />
                {touched.city && errors.city && <Typography style={{ color: "red", fontSize: "12px" }}>{errors.city}</Typography>}
              </Box>

              <Button type="submit" variant="contained">
                Add City
              </Button>
            </form>
          )
        }}
      </Formik>
    </HomeLayout>
  )
}

export default withAuth(view)

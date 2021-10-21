import type { NextPage } from "next"
import { useEffect, useState } from "react"
import { Formik } from "formik"
import { useRouter } from "next/router"
import * as Yup from "yup"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import HomeLayout from "src/layouts/HomeLayout"
import withAuth from "src/guard/withAuth"
import { editCountry, getCountrybyId } from "src/API"
import { Country } from "src/types"

const edit: NextPage = () => {
  const { push, query } = useRouter()
  const { id } = query
  const [country, setCountry] = useState<Country | null>(null)

  useEffect(() => {
    ;(async () => {
      if (id) setCountry(await getCountrybyId({ id }))
    })()
  }, [id])

  const handleEditCountry = async (values: any) => {
    editCountry({ id: values.id, name: values.country })
    push("/country")
  }

  return (
    <HomeLayout>
      <Formik
        enableReinitialize
        onSubmit={handleEditCountry}
        initialValues={{
          id: country?.id,
          country: country?.name,
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
                <TextField value={values.country} fullWidth name="country" disabled={isSubmitting} onChange={handleChange} onBlur={handleBlur} id="outlined-basic" variant="outlined" />
                {touched.country && errors.country && <Typography style={{ color: "red", fontSize: "12px" }}>{errors.country}</Typography>}
              </Box>

              <Button type="submit" variant="contained">
                Edit Country
              </Button>
            </form>
          )
        }}
      </Formik>
    </HomeLayout>
  )
}

export default withAuth(edit)

import { useEffect, useState } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import * as Yup from "yup"
import { Formik } from "formik"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import HomeLayout from "src/layouts/HomeLayout"
import withAuth from "src/guard/withAuth"
import { City } from "src/types"
import { editCity, getCitybyId } from "src/API"

const view: NextPage = () => {
  const { query, push } = useRouter()
  const cityid = String(query.cityid)
  const [city, setCity] = useState<City | null>(null)

  useEffect(() => {
    ;(async () => {
      if (cityid) {
        setCity(await getCitybyId({ id: Number(cityid) }))
      }
    })()
  }, [cityid])

  const handleCityCountry = (values: any) => {
    try {
      // @ts-ignore
      editCity({ cityId: Number(String(query.cityid)), countryId: Number(String(query.id)), name: values.city })
      push(`/country/view/${query.id}`)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <HomeLayout>
      <Formik
        enableReinitialize
        onSubmit={handleCityCountry}
        initialValues={{
          id: city?.id,
          city: city?.name,
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
                <TextField value={values.city} fullWidth name="city" disabled={isSubmitting} onChange={handleChange} onBlur={handleBlur} id="outlined-basic" variant="outlined" />
                {touched.city && errors.city && <Typography style={{ color: "red", fontSize: "12px" }}>{errors.city}</Typography>}
              </Box>

              <Button type="submit" variant="contained">
                Edit city
              </Button>
            </form>
          )
        }}
      </Formik>
    </HomeLayout>
  )
}

export default withAuth(view)

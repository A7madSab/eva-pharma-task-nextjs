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
import { addCityToCountries, getCountrybyId, getCitiesOfCountry, deleteCity } from "src/API"
import { City, Country } from "src/types"

import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import IconButton from "@mui/material/IconButton"
import EditIcon from "@mui/icons-material/Edit"
import VisibilityIcon from "@mui/icons-material/Visibility"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

const view: NextPage = () => {
  const { query, push } = useRouter()
  const id = String(query.id)
  const [country, setCountry] = useState<Country | null>(null)
  const [cities, setCities] = useState<City[] | null | undefined>(null)

  useEffect(() => {
    ;(async () => {
      if (id) {
        setCountry(await getCountrybyId({ id }))
        setCities(await getCitiesOfCountry({ countryId: Number(id) }))
      }
    })()
  }, [id])

  const handleAddCity = async (values: any) => {
    try {
      await addCityToCountries({ city: values.city, countryId: Number(id) })
    } catch (err) {
      console.error(err)
    }
  }

  const handleCityDelete = async ({ id: cityId }: { id: number }) => {
    const filteredCities = cities?.filter((city) => city.id !== cityId)

    try {
      await deleteCity({ cityId: Number(cityId) })
      setCities(filteredCities)
    } catch (err) {
      console.error(err)
    }
  }

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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">View</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cities?.map(({ id: cityId, name }) => (
              <TableRow key={cityId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {cityId}
                </TableCell>
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="right">
                  <IconButton>
                    <VisibilityIcon onClick={() => push(`/country/view/${country?.id}/city/${cityId}`)} />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton>
                    <EditIcon onClick={() => push(`/country/edit/${country?.id}/city/${cityId}`)} />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleCityDelete({ id: Number(cityId) })}>
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </HomeLayout>
  )
}

export default withAuth(view)

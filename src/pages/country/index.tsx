import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

import { deleteCountry, getAllCountries } from "src/API"
import withAuth from "src/guard/withAuth"
import HomeLayout from "src/layouts/HomeLayout"
import { Country as CountryType } from "src/types"

import Button from "@mui/material/Button"
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

const Country: NextPage = () => {
  const { push } = useRouter()
  const [countries, setCountries] = useState<CountryType[]>([])

  useEffect(() => {
    ;(async () => {
      setCountries(await getAllCountries())
    })()
  }, [])

  const handleCountryDelete = async ({ id }: { id: number }) => {
    const filteredcountries = countries.filter((country) => country.id !== id)

    try {
      await deleteCountry({ id })
      setCountries(filteredcountries)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <HomeLayout>
      <Button onClick={() => push("/country/add")}>Add Country</Button>
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
            {countries.map(({ id, name }) => (
              <TableRow key={id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell align="right">
                  <IconButton>
                    <VisibilityIcon onClick={() => push(`/country/view/${id}`)} />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton>
                    <EditIcon onClick={() => push(`/country/edit/${id}`)} />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleCountryDelete({ id })}>
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

export default withAuth(Country)

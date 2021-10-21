import { useEffect, useState } from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"

import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import HomeLayout from "src/layouts/HomeLayout"
import withAuth from "src/guard/withAuth"
import { City } from "src/types"
import { getCitybyId } from "src/API"

const view: NextPage = () => {
  const { query } = useRouter()
  const cityid = String(query.cityid)
  const [city, setCity] = useState<City | null>(null)

  useEffect(() => {
    ;(async () => {
      if (cityid) {
        setCity(await getCitybyId({ id: Number(cityid) }))
      }
    })()
  }, [cityid])

  return (
    <HomeLayout>
      <Box pb={1}>
        <TextField value={city?.name} fullWidth name="country" disabled id="outlined-basic" variant="outlined" />
      </Box>
    </HomeLayout>
  )
}

export default withAuth(view)

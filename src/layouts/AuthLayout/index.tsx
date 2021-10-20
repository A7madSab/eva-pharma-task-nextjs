import type { FC } from "react"

import Card from "@mui/material/Card"
import Grid from "@mui/material/Grid"
import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"

const AuthLayout: FC = ({ children }) => {
  return (
    <Grid container sx={{ height: "100vh" }} justifyContent="center" alignItems="center">
      <Grid item>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography align="center" variant="h6">
              Login
            </Typography>
          </CardContent>

          <CardContent>{children}</CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default AuthLayout

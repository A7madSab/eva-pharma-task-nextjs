import Link from "next/link"
import { Button, Typography } from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import useAuth from "src/hooks/useAuth"

const Header = () => {
  const { logout } = useAuth()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "white", textDecoration: "none" }}>
            <Link href="/">
              <a>EvaPharma</a>
            </Link>
          </Typography>
          <Button color="secondary" onClick={() => logout()}>
            <Typography color="white">logout</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header

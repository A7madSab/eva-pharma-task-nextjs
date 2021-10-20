import Grid from "@mui/material/Grid"
import CircularProgress from "@mui/material/CircularProgress"

const Loader = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
      <CircularProgress color="primary" size={120} />
    </Grid>
  )
}

export default Loader

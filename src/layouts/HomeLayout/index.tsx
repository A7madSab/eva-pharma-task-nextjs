import { FC } from "react"
import Container from "@mui/material/Container"
import Header from "src/layouts/HomeLayout/Header"

const HomeLayout: FC = ({ children }) => {
  return (
    <div>
      <Header />
      <Container sx={{ paddingTop: "20px" }}>{children}</Container>
    </div>
  )
}

export default HomeLayout

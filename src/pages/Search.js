import React, {useState} from "react"
import {Header} from "../components/Header"
import {Container, Paper, Tab, Tabs} from "@material-ui/core"
import '../scss/search.scss'
import {RegularSearch} from "../components/RegularSearch";
import {ExpandedSearch} from "../components/ExpandedSearch";

export const Search = () => {
  const [searchType, setSearchType] = useState(0)

  return (
    <>
      <Header/>
      <Paper square>
        <Tabs
          value={searchType}
          TabIndicatorProps={{
            style: {
              backgroundColor: "#F48939"
            }
          }}
          centered
          onChange={(_, v) => setSearchType((v))}
        >
          <Tab label="Обычный поиск"/>
          <Tab label="Расширенный поиск"/>
        </Tabs>
      </Paper>
      <Container>
        {
          searchType === 0 ? <RegularSearch/> : <ExpandedSearch/>
        }
      </Container>
    </>
  )
}
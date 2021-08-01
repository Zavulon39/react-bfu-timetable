import {Switch, Route, Redirect} from 'react-router-dom'
import {AbitsTimetable} from "../pages/AbitsTimetable"
import {TeacherTimetable} from "../pages/TeacherTimetable"
import {Search} from "../pages/Search"

export const useRouter = () => (
  <Switch>
    <Route path="/students/" exact>
      <AbitsTimetable/>
    </Route>
    <Route path="/teachers/" exact>
      <TeacherTimetable/>
    </Route>
    <Route path="/search/" exact>
      <Search/>
    </Route>

    <Redirect to="/students/"/>
  </Switch>
)

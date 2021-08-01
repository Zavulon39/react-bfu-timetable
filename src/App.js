import {useState, useEffect} from "react"
import {BrowserRouter} from "react-router-dom";
import {useRouter} from "./hooks/useRouter"
import {bootstrap} from "./bootstrap";
import './scss/index.scss'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const routes = useRouter()

  useEffect(() => {
    bootstrap().then(() => setLoaded(true))
  }, [])

  if (!loaded) return null

  return (
    <BrowserRouter>
      {routes}
    </BrowserRouter>
  );
}

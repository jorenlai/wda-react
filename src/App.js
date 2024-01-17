import './App.css'
import AppProvider from './component/AppProvider'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ExerciseApp from './exercise'
import ResetApp from './exercise/reset'
import ReadyApp from './exercise/ready'
import TestApp from './test'
import PlanForm from './exercise/plan/planForm'
import JPanel from './jrx/JPanel'
import { po } from './jrx/Util'
import Init from './exercise/init'
import Authentication from './component/Authentication'
import WebApp from './web'

function Tmp(){
	return <div>
		<a href={'/exercise/init/345-34-4-36-'}>Init</a>
		<Link to="/exercise/init/345-34-4-36-">Init 2</Link>
	</div>
}

function App() {
	return <AppProvider>
		<BrowserRouter basename={'/wda-react'}>
			<Routes>
				<Route path="*" element={<Tmp/>}/>
				<Route path="/map" element={<TestApp/>}/>
				<Route path="/web/*" element={<WebApp/>}/>
				<Route path="/plan/*" element={<PlanForm/>}/>

				<Route path="/:type/init/:id" element={<Init/>} exact/>
				<Route path="/:type/ready" element={<ReadyApp/>} exact/>
				<Route path="/:type/:topic/*" element={<Authentication><ExerciseApp/></Authentication>}/>

				<Route path="/:type/reset" element={<ResetApp/>} exact/>
				<Route path="/office" element={<Authentication><div>A</div></Authentication>}/>
			</Routes>
		</BrowserRouter>
  </AppProvider>
}

export default App;

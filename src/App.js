import './App.css'
import AppProvider from './component/AppProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExerciseApp from './exercise'
import ResetApp from './exercise/reset'
import ReadyApp from './exercise/ready'
import WebApp from './exercise/administrator/WebApp'
import TestApp from './test'

function App() {
	return <AppProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/test/*" element={<TestApp/>}/>
				<Route path="/web/*" element={<WebApp/>}/>
				<Route path="/exercise/reset" element={<ResetApp/>}/>
				<Route path="/exercise/ready" element={<ReadyApp/>}/>
				<Route path="/exercise/*" element={<ExerciseApp/>}/>
			</Routes>
		</BrowserRouter>
  </AppProvider>
}

export default App;

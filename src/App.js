import logo from './logo.svg'
import './App.css'
import AppProvider from './component/AppProvider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExerciseApp from './exercise'

function App() {
	// console.clear()
	return <AppProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/exercise/*" element={<ExerciseApp/>}/>
			</Routes>
		</BrowserRouter>
  </AppProvider>
}

export default App;

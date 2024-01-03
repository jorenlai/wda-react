import { Provider,useDispatch, useSelector  } from 'react-redux'
import store from '../redux/store'
import AntdStyles from '../theme/antdStyles'
import LoadingBar from '../jrx/LoadingBar'
import GlobalStyle from '../theme/globalStyle'

export default function AppProvider({children}){
	return <Provider store={store} >
		{/* <GlobalStyle/> */}
		<AntdStyles/>
		<LoadingBar/>
        {children}
	</Provider>
}
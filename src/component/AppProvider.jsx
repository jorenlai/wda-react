import { Provider,useDispatch, useSelector  } from 'react-redux'
import store from '../redux/store'
import AntdStyles from '../theme/antdStyles'

export default function AppProvider({children}){
	return <Provider store={store} >
		<AntdStyles/>
        {children}
	</Provider>
}
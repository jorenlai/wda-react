import { Provider,useDispatch, useSelector  } from 'react-redux'
import store from '../redux/store'
import AntdStyles from '../theme/antdStyles'
import LoadingBar from '../jrx/LoadingBar'
import GlobalStyle from '../theme/globalStyle'
import { ThemeProvider } from 'styled-components'
import { ConfigProvider } from 'antd'
import exerciseTheme from '../theme/exercise.json'
import rehearsalTheme from '../theme/rehearsal.json'
import tw from '../assets/i18n/tw'
import { po } from '../jrx/Util'

const themes={
	exercise:exerciseTheme
	,rehearsal:rehearsalTheme
}

const userStyle={
	small:{
		fontSize:'small'
	}
	,middle:{
		fontSize:'middle'
	}
	,large:{
		fontSize:'large'
	}
}
const Web=({children})=>{
	const web = useSelector((state) => state.web)
	const user = useSelector((state) => state.user)
	const theme=themes[web.themeName]??exerciseTheme
	theme.fontSize=user.fontSize
	// po('theme.fontSize',user.fontSize,theme.fontSize)
	// po('theme',theme)
	return <ThemeProvider theme={theme}>
		<ConfigProvider
			locale={'zhTW'}
			theme={{
				token:theme
			}}
		>
			{children}
		</ConfigProvider>
	</ThemeProvider>
}

export default function AppProvider({children}){
	return <Provider store={store} >
		<Web>
			<AntdStyles/>
			<GlobalStyle/>
			<LoadingBar/>
			{children}
		</Web>
	</Provider>
}
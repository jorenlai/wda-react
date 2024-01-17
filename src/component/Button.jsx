import { Button  as ADButton } from 'antd';
import { useTheme } from "styled-components";

const sizeMap={
	small:'small'

	,medium:'middle'
	,large:'large'
	,larger:'large'
}
export default function Button({children,...props}){
	const theme = useTheme();

	return <ADButton size={sizeMap[theme.fontSize]} style={{fontSize:theme.fontSize}}  {...props}>{children}</ADButton>
}
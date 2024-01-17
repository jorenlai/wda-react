import { useDispatch, useSelector } from 'react-redux';
import {   userActions } from '../redux/user'
import Button from './Button';



export default function SizeSelector(){
	const user = useSelector((state) => state.user)
	const dispatch = useDispatch()
	const setSize=(size)=>{
		document.getElementById("root").style.fontSize = size;
		dispatch(userActions.setFontSize(size))
	}
	return <div>
		{user.fontSize}
		<button
			onClick={()=>setSize('small')}
		>
			s
		</button>
		<button
			onClick={()=>setSize('medium')}
		>
			m
		</button>	
		<button
			onClick={()=>setSize('large')}
		>
			l
		</button>			
	</div>
}
import './customStyles.css';
import { Card } from 'react-bootstrap';
import Header from './components/Header';
import Body from './components/Body';
import { selectErrorState } from './slices/errorSlice';
import { useDispatch, useSelector } from 'react-redux';
import ErrorModal from './components/UI/ErrorModal';
import { CLEAR_ERROR } from './constants';

const style = {
	width: '50%',
	marginLeft: 'auto',
	marginRight: 'auto',
	marginTop: '100px',
	borderRadius: '0px',
	border: '2px solid black',
};

function App() {
	const error = useSelector((state) => selectErrorState(state));

	const dispatch = useDispatch();

	return (
		<Card style={style}>
			{error.isError && (
				<ErrorModal
					errorData={error.errorData}
					onHide={() => {
						dispatch({ type: CLEAR_ERROR });
					}}
				/>
			)}
			<Header />
			<Body />
		</Card>
	);
}

export default App;

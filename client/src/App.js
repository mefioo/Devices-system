import './customStyles.css';
import { Card } from 'react-bootstrap';
import Header from './components/Header';
import Body from './components/Body';
import { Provider } from 'react-redux';
import store from './store';

const style = {
	width: '50%',
	marginLeft: 'auto',
	marginRight: 'auto',
	marginTop: '100px',
	borderRadius: '0px',
	border: '2px solid black',
};

function App() {
	return (
		<Provider store={store}>
			<Card style={style}>
				<Header />
				<Body />
			</Card>
		</Provider>
	);
}

export default App;

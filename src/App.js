import React from 'react';
import './App.css';
import Head from './components/head/head.js'
import Table from './components/table/table.js'



class App extends React.Component {
	constructor(props){
		super(props)
		this.handelTouch = this.handelTouch.bind(this)
	}

	handelTouch(e){
		let table = document.querySelector('.table');
		table.classList.remove('mouse');
		table.classList.add('touch');
	}

render() {
	return (
		<article onTouchStart={this.props.touch? this.handelTouch : null} 
		className={(this.props.touch?'':'notouch')+ " coins"} >
			<Head/>
			<Table coins={this.props.coins}/>
		</article>
		);
}

}

export default App;

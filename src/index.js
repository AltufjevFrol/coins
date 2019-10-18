import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let touch;
if(('ontouchstart' in window) || window.DocumentTouch){
	console.log('this is a touch device');
	touch = true
}else{
	console.log('this is not a touch device');
	touch = false
}

	fetch('https://api.coincap.io/v2/assets/?limit=15')
		.then(res=>res.json())
			.then((mes)=>{
				ReactDOM.render(<App coins={mes} touch={touch}/>, document.getElementById('root'));
			})
				.catch(err=>console.log(err));


/*ReactDOM.render(<App coins={coins}/>, document.getElementById('root'));*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

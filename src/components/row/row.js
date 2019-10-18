import React from 'react';
import style from './row.module.css';

class Row extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: props.data.name,
			market: props.data.marketCapUsd,
			price: props.data.priceUsd,
			volume: props.data.volumeUsd24Hr,
			color: style.usual,
			symbol: <div/>
		};
	}

	componentDidMount(){
		let socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${this.props.data.id}`);
		socket.onmessage = (mes)=>this.updatePrice(mes);
		socket.onerror = (err)=>console.log(err);
		this.getSymbol();
	}

	updatePrice(mes){
		let data = JSON.parse(mes.data);
		let oldPrice = this.state.price;
		this.setState({price:data[this.props.data.id]});
		if(this.conversionNum(oldPrice)!== this.conversionNum(this.state.price)){
			this.setState({color:style.changed});
			setTimeout(()=>this.setState({color:style.usual}), 200);
		}
	}

	conversionNum(strNum){
		let short = parseFloat(strNum).toFixed(2);
		let indexPoint = strNum.indexOf('.');
		
		if(indexPoint < 4){
			return `${short}`;
		}
		if(indexPoint >= 4 && indexPoint < 7){
			return `${short.slice(0, indexPoint-3)},${short.slice(indexPoint-3)}`
		}
		if(indexPoint >= 7 && indexPoint < 10){
			return `${short.slice(0, indexPoint-6)}.${short.slice(indexPoint-6, indexPoint-4)}m`
		}
		if(indexPoint >= 10 && indexPoint < 13){
			return `${short.slice(0, indexPoint-9)}.${short.slice(indexPoint-9, indexPoint-7)}b`
		}
		return strNum;
}

	getSymbol(){
		let img = document.createElement('img');
		let src = `https://static.coincap.io/assets/icons/${this.props.data.symbol.toLowerCase()}@2x.png`;
		img.src = src;
		let symbol = <img alt="logo" src={src} className={style.img}/>;
		let logo = <img alt="logo" src="https://coincap.io/static/logo_mark.png" className={style.img}/>;
		img.onload = ()=>{this.setState({symbol: symbol})};
		img.onerror = ()=>{this.setState({symbol: logo})};
	}



	render() {
		return (
			<tr className={this.state.color}>
				<td className={style.name}>{this.state.symbol}{this.state.name}</td>
				<td className={style.price}>$ {this.conversionNum(this.state.price)}</td>
				<td className={style.market}>$ {this.conversionNum(this.state.market)}</td>
				<td className={style.volume}>$ {this.conversionNum(this.state.volume)}</td>
			</tr>
				);
	}

}

export default Row;
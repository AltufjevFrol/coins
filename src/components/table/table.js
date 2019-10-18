import React from 'react';
import Row from '../row/row.js'

function Table (props){
	let coins = props.coins.data.map(i=> <Row data={i} key={i.id}/>);

	return (
		<section className="mouse table">
			<table>
				{coins}
			</table>
		</section>
		);
}

export default Table;
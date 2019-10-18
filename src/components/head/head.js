import React from 'react';
import style from './head.module.css'
function Head (props){
	return (
		<section className={style.head}>
			<table>
				<tr>
					<th className={style.name}>Имя</th>
					<th className={style.price}>Стоимость</th>
					<th className={style.market}>Рыночная капитализация</th>
					<th className={style.volume}>Суточный объем</th>
				</tr>
			</table>
		</section>
		)
}

export default Head;
import SelectToken from '@/features/SelectToken/SelectToken';
import styles from './Exchanger.module.css'
import Button from '@/components/button/button';
import { useContext } from 'react';
import { ThemeContext } from '@/Context/ThemeContext';
import Etherimage from '@/assets/etherium.png';

function Exchanger() {
	const { mode } = useContext(ThemeContext);

	return <div className={styles.wrapper}>
		<div className={styles.box}>
			<div className={styles.title}>
				SWAP
			</div>
			<div className={styles.boxRow} >
				<div className={styles.boxInput}>
					<input type="text" className={styles.input} />
					<div className={styles.etherBox}>
						ETH
						<img src={Etherimage} alt="ether" />
					</div>
				</div>
				<div className={styles.boxInput}>
					<input type="text" className={styles.input} />
					<div>
						<SelectToken />
					</div>
				</div>
			</div>
			<div className={styles.btn}>
				<Button theme={mode} size={'l'} >
					Connect
				</Button>
			</div>
		</div>
	</div>;
}

export default Exchanger;

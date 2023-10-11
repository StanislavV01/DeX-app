import SelectToken from '@/features/SelectToken/SelectToken';
import styles from './Exchanger.module.css'
import Button from '@/components/button/button';
import Etherimage from '@/assets/etherium.png';
import { useTheme } from '@/hooks/useTheme';

function Exchanger() {
	const { mode } = useTheme();

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

import styles from './ChangeToken.module.css';
import { ReactComponent as SearchIcon } from '@/assets/searchIcon.svg';

const _placeholder = 'Search name or paste address'

function ChangeToken(): JSX.Element {
	return <div>
		<div className={styles.search}>
			<SearchIcon className={styles.Searchicon} />
			<input type="text" className={styles.input} placeholder={_placeholder} />
		</div>
	</div>;
}

export default ChangeToken;

import { useState } from 'react';
import styles from './search.module.css';
import classNames from 'classnames';
import { ReactComponent as SearchIcon } from '@/assets/searchIcon.svg';
import { SearchProps } from './Search.props';

const placeholder = 'Search tokens and NFT collections';

function Search({ className, ...props }: SearchProps): JSX.Element {
	const [open, setOpen] = useState<boolean>(false);
	const [value, setValue] = useState<string>('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
	const handleFocus = () => setOpen(true);
	const handleBlur = () => setOpen(false);

	return (
		<div className={classNames(className, styles.wrapper, { [styles.open]: open })} {...props}>
			<div className={styles.container}>
				<SearchIcon className={styles.icon} />
				<input
					type="text"
					className={styles.input}
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
			</div>

			{open && (
				<div className={styles.results}>
					{!!value ? <p>No Results...</p> : <p>Loading...</p>}
				</div>
			)}
		</div>
	);
}

export default Search;

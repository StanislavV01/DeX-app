import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import styles from './Header.module.css';
import Search from '@/features/Search/Search';
import Button from '@/components/button/button';
import { ThemeContext } from '@/Context/ThemeContext';
import Drawer from '../Drawer/Drawer';
import ChainSwitcher from '@/features/ChainSwitcher/ChainSwitcher';



function Header() {
	const { mode } = useContext(ThemeContext);
	const [open, setOpen] = useState<boolean>(false)
	const handleClose = () => {
		setOpen(false);

	}
	return (
		<header className={styles.header}>
			<div className={styles.headerContent}>
				<Link to="/">
					<Logo className={styles.logo} />
				</Link>
				<div className={styles.search}>
					<Search />
				</div>
				<div className={styles.chainSwitcher}>
					<ChainSwitcher />
				</div>
				<div className={styles.connect}>
					<Button size="s" theme={mode} onClick={() => setOpen(true)}>
						Connect
					</Button>
				</div>
				<Drawer handleClose={handleClose} open={open} />
			</div>
		</header>
	)
}

export default Header;

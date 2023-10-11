import Modal from '@/components/modal/modal';
import styles from './SelectToken.module.css';
import WithPortal from '@/components/withPortal/WithPortal';
import { useState } from 'react';


function SelectToken() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const handleClose = () => setIsOpen(false);
	const handleOpen = () => setIsOpen(true);

	return (
		<>
			<div>
				<button onClick={() => handleOpen()} className={styles.selectBtn}>
					Select Token <span>

					</span>
				</button >

			</div>
			<WithPortal rootId='modal-1'>
				<Modal title={'Choose token'} isOpen={isOpen} handleClose={handleClose}>


				</Modal>
			</WithPortal>
		</>
	)
}

export default SelectToken;

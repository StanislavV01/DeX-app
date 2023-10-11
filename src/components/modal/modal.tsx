import { ModalProps } from "./Modal.props";
import styles from './Modal.module.css';
import { ReactComponent as CloseIcon } from '@/assets/close-icon.svg';
import classNames from "classnames";
import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { animationModal } from "@/helpers/animationsVariants";
import { useTheme } from "@/hooks/useTheme";

function modal({ children, title, isOpen, handleClose, className, ...props }: ModalProps): JSX.Element {
	const { mode } = useTheme();

	const modalRef = useRef<HTMLDivElement | null>(null)
	const closeModal = (e: React.MouseEvent<HTMLElement>) => {

		if (e.target != modalRef.current && !modalRef.current?.contains(e.target as Node)) {
			handleClose()
		}
	}

	return (
		<AnimatePresence>
			{isOpen &&

				<motion.div
					className={styles.wrapper}
					onClick={(e) => closeModal(e)}
					layout
					variants={animationModal}
					initial="hidden"
					animate={'visible'}
					exit={'hidden'}
				>
					<div className={classNames(styles.modal, className,
						{ [styles.dark]: mode === 'dark' }
					)} {...props} ref={modalRef}>
						<div className={styles.header}>
							<div className={styles.title}>
								{title}
							</div>
							<div className={styles.close} onClick={() => handleClose()}>
								<CloseIcon />
							</div>
						</div>
						<div className={styles.content}>
							{children}
						</div>
					</div>
				</motion.div>

			}
		</AnimatePresence>
	)
}

export default modal;

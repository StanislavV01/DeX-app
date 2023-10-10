import styles from './pageContainer.module.css';
import { PageContainerProps } from './pageContainer.props';

function PageContainer({ children, ...props }: PageContainerProps) {
	return <div className={styles.container} {...props}>
		{children}
	</div>;
}

export default PageContainer;

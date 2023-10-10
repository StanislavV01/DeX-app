import classNames from "classnames";
import { ButtonProps } from "./button.props";
import styles from './button.module.css';

function Button({ theme = 'dark', size, className, children, ...props }: ButtonProps): JSX.Element {
  return (

    <button className={classNames(className, styles.btn, {
      [styles.dark]: theme === 'dark',
      [styles.light]: theme === 'light',
      [styles.small]: size === 's',
      [styles.large]: size === 'l'
    })}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button;

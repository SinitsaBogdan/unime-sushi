import '../index.css';
import styles from './app.module.css';

export default function App() {
	return (
		<div className={styles.app}>
			<h1 data-testid='title'>Hello World</h1>
		</div>
	);
}

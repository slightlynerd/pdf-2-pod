import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = ({ title }) => (
	<header class={style.header}>
		<Link href="/"><img src="../../assets/arrow-left-solid.svg" width="28" height="24" /></Link>
		<h1>{title}</h1>
	</header>
);

export default Header;

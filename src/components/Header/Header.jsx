import Nav from '../Nav';

import style from './Header.module.css';

// console.log(style);

const PUBLIC_URL = process.env.PUBLIC_URL;

function Header() {
	return (
	<header className={style.block}>
		<div className={style.logo}>
            <a href="/">
                <img src={PUBLIC_URL + '/logo.svg'} alt="#" />
            </a>
        </div>
		<Nav />
	</header>
	);
}

export default Header;
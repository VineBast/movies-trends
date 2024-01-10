import Image from 'next/image'
import trends from "/public/trends.png"
import movieTrendsLogo from "/public/movieTrendsLogoTypo.png";
import Link from 'next/link';

export const Header = () => {

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <Link href='/' ><Image width={150} height={150} src={movieTrendsLogo} alt={'movie trends logo typo'} /></Link>
            </div>
            <div className="navbar-center">
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link href="/">Homepage</Link></li>
                        <li><Link href="/movies">Pasted weeks data</Link></li>
                        <li><Link href="/about">About</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import useStore from "@/data/store"; // Obtain store created with Zustand
import { useRouter } from 'next/router';

const Header: React.FC = () => {

    const router = useRouter()

    const session = useStore(state => state.session);
    const updateSession = useStore(state => state.updateSession);

    const [showDropdown, setShowDropdown] = useState<string>('none')
    const dropDownRef = useRef<HTMLDivElement>(null)
    const buttonRef = useRef<HTMLAnchorElement>(null)

    const [navBarCollapse, setNavBarCollapse] = useState<string>('collapse')

    const handleNavBarShow = (evt: any) => {
        evt.preventDefault()

        if (navBarCollapse == 'collapse')
            setNavBarCollapse('')
        else
            setNavBarCollapse('collapse')

    }

    const handleDropdown = (evt: any) => {
        evt.preventDefault()

        if (showDropdown == 'block')
            setShowDropdown('none')
        else
            setShowDropdown('block')

    }

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropDownRef.current &&
            !dropDownRef.current.contains(event.target as Node) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target as Node)
        ) {
            setShowDropdown('none');
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <>
            <Head>
                <meta name="description" content="" />
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
                
            </Head>
            <header className="navbar navbar-expand-md navbar-dark navbar-overlap d-print-none">
                <div className="container-xl">
                    <button onClick={(evt) => handleNavBarShow(evt)} className="navbar-toggler" type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                        <Link href="/">
                            <Image src="/img/logo-white.svg" width={110} height={32} alt="Main_Logo" className="navbar-brand-image" />
                        </Link>
                    </h1>
                    <div className="navbar-nav flex-row order-md-last">
                        <div className="nav-item">
                            <Link href="#" ref={buttonRef} onMouseLeave={(evt) => {
                                setTimeout(() => {
                                    if (!dropDownRef.current?.matches(':hover')) {
                                        setShowDropdown('none')
                                    }
                                }, 200)
                            }} onClick={(evt) => handleDropdown(evt)} className="nav-link d-flex lh-1 text-reset p-0" aria-label="Open user menu">
                                <span className="avatar avatar-sm" style={{ backgroundImage: "url(https://avatar.iran.liara.run/public)" }}></span>
                                <div className="d-none d-xl-block ps-2">
                                    <div>{session.user.firstName} {session.user.lastName}</div>
                                    <div className="mt-1 small text-muted">{session.user.role.toUpperCase()}</div>
                                </div>
                            </Link>
                            <div onMouseEnter={(evt) => setShowDropdown('block')} ref={dropDownRef} id="user_profile_dropdown" style={{ display: `${showDropdown}`, top: '50px', right: '115px' }} className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">

                                <Link onClick={(evt) => {
                                    evt.preventDefault();
                                    updateSession({
                                        ...session,
                                        loggedIn: false
                                    });
                                    router.reload()
                                }} href="/" className="dropdown-item">Logout</Link>
                            </div>
                        </div>
                    </div>
                    <div className={`${navBarCollapse} navbar-collapse`} id="navbar-menu">
                        <div className="d-flex flex-column flex-md-row flex-fill align-items-stretch align-items-md-center">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" href="/" >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <i className='bi bi-house'></i>
                                        </span>
                                        <span className="nav-link-title">
                                            Home
                                        </span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/events" >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <i className='bi bi-pin-map'></i>
                                        </span>
                                        <span className="nav-link-title">
                                            Events
                                        </span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" href="/users" >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <i className='bi-people'></i>
                                        </span>
                                        <span className="nav-link-title">
                                            Users
                                        </span>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link onClick={(evt) => {
                                        evt.preventDefault();
                                        updateSession({
                                            ...session,
                                            loggedIn: false
                                        });
                                        router.reload()
                                    }} className="nav-link" href="/" >
                                        <span className="nav-link-icon d-md-none d-lg-inline-block">
                                            <i className='bi-people'></i>
                                        </span>
                                        <span className="nav-link-title">
                                            Sign Out
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;
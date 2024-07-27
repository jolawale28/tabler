import React, { useEffect, useState } from "react"
import Layout from './layout'
import "@/styles/globals.css";
import '../styles/custom.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Image from 'next/image';

import useStore from "@/data/store"; // Obtain store created with Zustand
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {

  const session = useStore(state => state.session);
  const updateSession = useStore(state => state.updateSession);

  const router = useRouter()

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleShowPassword = (e: any) => {
    e.preventDefault()

    setShowPassword(!showPassword)
  }

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsSubmitting(true)

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.status === 200) {
        let user = data.response.user
        let token = data.response.token

        localStorage.setItem('token', data.response);

        toast.success("Login success! Page will direct...")

        setTimeout(() => { // Using the setTimeout to simulate page request load
          updateSession({
            user: user,
            token: token,
            loggedIn: true
          })

        }, 2000)

      } else {
        console.log(data.message);
      }

      setIsSubmitting(false)
    }
    catch (error) {
      console.log(error)
      setIsSubmitting(false)
    }
  };

  const isLoginPage = router.pathname === '/login';

  if (!session.loggedIn) {
    return (
      <>
        <Head>
          <title>Login :: Tabler</title>

          <link href="/img/logo-white.svg" rel="icon" />
          <link href="/img/logo-white.svg" rel="apple-touch-icon" />
          <link rel="mask-icon" href="/img/logo-white.svg" color="#ffffff" />

          <meta name="title" content="website" />
          <meta name="author" content="Tabler Events Dashboard" />
          <meta name="description" content="Events Management Dashboard" />
          <meta name="keywords" content="event, dashboard, location, programs, nigeria, abuja, programming, coding" />
          <link rel="canonical" href="https://tabler-kohl.vercel.app/" />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://tabler-kohl.vercel.app/" />
          <meta property="og:title" content="Tabler :: Events Management App" />
          <meta property="og:description" content="Events management dashboard app" />
          <meta property="og:image" content="/img/logo-white.svg" />

          {/* <!-- Twitter Meta Tags --> */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="tabler-kohl.vercel.app/" />
          <meta property="twitter:url" content="https://tabler-kohl.vercel.app/" />
          <meta name="twitter:title" content="Tabler :: Events Management App" />
          <meta name="twitter:description" content="Events Management App" />
          <meta name="twitter:image" content="/img/logo-white.svg" />

        </Head>
        
        <div className="page page-center" style={{ background: 'url(https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="container-tight py-4">
            <div className="text-center mb-4">
              <Link href="/" className="navbar-brand navbar-brand-autodark"><Image src="/img/logo-white.svg" width={100} alt="" /></Link>
            </div>
            <form onSubmit={handleSubmit} className="card card-md" method="get" autoComplete="off">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Login to your account</h2>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input value={username} onChange={(e) => setUsername(e.target.value)} type="" className="form-control" placeholder="jondoe" autoComplete="off" required />
                </div>
                <div className="mb-2">
                  <label className="form-label">
                    Password
                  </label>
                  <div className="input-group input-group-flat">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type={(showPassword) ? 'password' : 'text'} className="form-control" placeholder="********" autoComplete="off" required />
                    <span className="input-group-text">
                      <button onClick={(evt) => handleShowPassword(evt)} type="button" className="link-secondary bg-transparent border-0" title="Show password">
                        <i className={`bi bi-${(showPassword) ? 'eye-slash' : 'eye'}`}></i>
                      </button>
                    </span>
                  </div>
                </div>
                <div className="form-footer">
                  <button disabled={(isSubmitting) ? true : false} type="submit" className="btn btn-primary w-100">{(isSubmitting) ? 'Submitting...' : 'Login'}</button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <Toaster />
      </>
    );
  }

  if (isLoginPage) {
    // Return login page without the layout
    return <Component {...pageProps} />;
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

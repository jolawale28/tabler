import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import useStore from "@/data/store"; // Obtain store created with Zustand
import Link from "next/link";
import Image from 'next/image';

const LoginPage = () => {

    const session = useStore(state => state.session);
    const updateSession = useStore(state => state.updateSession);

    const router = useRouter()

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

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

                updateSession({
                    user: user,
                    token: token,
                    loggedIn: true
                })

                if (session.loggedIn == true) console.log("We are in!")

                localStorage.setItem('token', data.response);
                router.push('/');

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

    return (
        <>
            <Head>
                <title>Login :: Tabler</title>
            </Head>
            <div className="page page-center" style={{ background: 'url(https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="container-tight py-4">
                    <div className="text-center mb-4">
                        <Link href="." className="navbar-brand navbar-brand-autodark"><Image src="/img/logo.svg" height="36" alt="" /></Link>
                    </div>
                    <form onSubmit={handleSubmit} className="card card-md" action="." method="get" autoComplete="off">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Login to your account</h2>
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} type="" className="form-control" placeholder="Enter username" autoComplete="off" />
                            </div>
                            <div className="mb-2">
                                <label className="form-label">
                                    Password
                                </label>
                                <div className="input-group input-group-flat">
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder="Password" autoComplete="off" />
                                    <span className="input-group-text">
                                        <a href="#" className="link-secondary" title="Show password" data-bs-toggle="tooltip">

                                            <i className="bi bi-eye"></i>
                                        </a>
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
        </>
    );
};

export default LoginPage;

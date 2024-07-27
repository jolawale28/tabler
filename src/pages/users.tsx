import React, { useEffect, useRef, useState } from "react"
import Head from "next/head";
import UserCard from "@/components/UserCard";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import toast, { Toaster } from 'react-hot-toast';

import useStore from "@/data/store"; // Obtain store created with Zustand

export default function Users() {

    const session = useStore(state => state.session);

    const [users, setUsers] = useState([])

    const [openAddUserModal, setOpenAddModal] = useState(false);

    const onCloseAddModal = () => setOpenAddModal(false);

    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [userName, setUserName] = useState<string>('')

    const [formSubmitting, setFormSubmitting] = useState<boolean>(false)

    const generateUsername = () => {
        const firstPart = firstName.substring(0, 3); // First 3 characters of the first name
        const lastPart = lastName.substring(0, 3); // First 3 characters of the last name
        const randomChars = Math.random().toString(36).substring(2, 5); // Generates 3 random characters
        const generatedUsername = `${firstPart}${lastPart}${randomChars}`;
        setUserName(generatedUsername);
    };

    const handleAddUser = async (evt: any) => {
        evt.preventDefault()

        setFormSubmitting(true)

        const formData = {
            firstName,
            lastName,
            userName,
            role: 'user'
        };

        try {
            const response = await fetch('/api/adduser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            setFormSubmitting(false)
            if (data.result) {
                toast.success("Operation success! User added.")
                setFirstName('')
                setLastName('')
                setUserName('')
                setOpenAddModal(false)
                setUsers(data.response)
            }
            else {
                toast.error("Operation aborted: " + data.response, { duration: 5000 })
                setOpenAddModal(false)
            }

            console.log(data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/getusers');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setUsers(result.data)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [])

    return (

        <>
            <Head>
                <title>Users :: Tabler</title>
            </Head>
            <div className="page">
                <div className="page-wrapper">
                    <div className="container-xl">
                        <div className="page-header d-print-none text-white">
                            <div className="row g-2 align-items-center">
                                <div className="col">
                                    <div className="page-pretitle">
                                        Home &bull; Users
                                    </div>
                                    <h2 className="page-title">
                                        Users
                                    </h2>

                                </div>
                                <div className="col-12 col-md-auto ms-auto d-print-none">
                                    <div className="d-flex">

                                        {
                                            session.user.role === 'admin' && (
                                                <button onClick={(evt) => setOpenAddModal(true)} className="btn btn-primary">
                                                    <i className="bi bi-person-add me-2"></i>
                                                    New User
                                                </button>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="page-body">
                        <div className="container-xl">
                            <div className="row row-cards">

                                {
                                    users.map((elem, index) => (
                                        <div key={`tab_${index}`} className="col-md-6 col-lg-3">
                                            <UserCard userDetails={elem} />
                                        </div>
                                    ))
                                }

                                <div className="d-flex mt-4">
                                    <div className="text-muted mt-1">1-18 of 413 people</div>
                                    <ul className="pagination ms-auto">
                                        <li className="page-item disabled">
                                            <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><polyline points="15 6 9 12 15 18" /></svg>
                                                prev
                                            </a>
                                        </li>
                                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item active"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#">4</a></li>
                                        <li className="page-item"><a className="page-link" href="#">5</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><polyline points="9 6 15 12 9 18" /></svg>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal open={openAddUserModal} onClose={onCloseAddModal} center classNames={{ modal: 'customModal' }}>
                <h2 className="border-bottom pb-3">New User</h2>
                <form onSubmit={(evt) => handleAddUser(evt)}>

                    <div className="mb-3">
                        <label className="form-label fw-bol">First Name:</label>
                        <input type="text" value={firstName} onChange={(evt) => setFirstName(evt.target.value)} className="form-control" required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bol">Last Name:</label>
                        <input type="text" value={lastName} onChange={(evt) => setLastName(evt.target.value)} className="form-control" required />
                    </div>

                    <div className="mb-3">
                        <label className="form-label fw-bol">Username:</label>
                        <input type="text" value={userName} onChange={(evt) => setUserName(evt.target.value)} className="form-control" required />
                    </div>

                    <div className="mt-4 text-end">
                        <button onClick={(evt) => {
                            setFirstName('')
                            setLastName('')
                            setUserName('')
                        }} type='reset' className='btn me-3'>Reset</button>
                        <button type='submit' className='btn btn-primary' disabled={(formSubmitting) ? true : false}>
                            {(formSubmitting) ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </Modal>

            <Toaster />
        </>
    )
}
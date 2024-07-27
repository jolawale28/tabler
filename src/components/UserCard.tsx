import Link from "next/link";
import React from "react"

interface User {
    firstName: string;
    lastName: string;
    role: 'user' | 'admin'
}

interface UserCardProps {
    userDetails: User
}

const UserCard: React.FC<UserCardProps> =({ userDetails }) => {
    return (
        <>
            <div className="card">
                <div className="card-body p-4 text-center">
                    <span className="avatar avatar-xl mb-3 avatar-rounded">{userDetails.firstName.substring(0, 1)}{userDetails.lastName.substring(0, 1)}</span>
                    <h3 className="m-0 mb-1"><Link href="#">{userDetails.firstName} {userDetails.lastName}</Link></h3>
                    <div className="mt-3">
                        <span className={`badge ${(userDetails?.role == 'admin') ? 'bg-purple-lt': 'bg-green-lt'}`}>{userDetails?.role.toUpperCase()}</span>
                    </div>
                </div>
                <div className="d-flex">
                    <button className="card-btn border-0 bg-white border-end border-top">
                        <i className="fas fa-edit me-2 text-warning"></i>
                        Edit</button>
                    <button className="card-btn border-0 bg-white border-start border-top">
                        <i className="fas fa-trash-alt me-2 text-danger"></i>
                        Delete</button>
                </div>
            </div>
        </>
    )
}

export default UserCard
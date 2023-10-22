import './UserPage.css';
import { useState } from 'react';
import Button from '../button/Button.jsx';

function UserPage({ user, ...props }) {

    return (
        <div className="">
            <div className="block">
                <div className="ctn">
                    <div className="user-info">
                        <div className="user-info-text-part">
                            <h2 className="h2-title username-field">{user.name}</h2>
                            <p className="main-text">{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserPage
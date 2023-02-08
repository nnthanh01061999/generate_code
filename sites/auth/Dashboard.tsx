import { AUTH_LOGIN_PATH } from '@/data';
import { useLogout } from '@/store/reducer/auth/authHooks';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

function Dashboard() {
    const router = useRouter();
    const logout = useLogout();

    const onLogout = () => {
        logout();
        router.push(AUTH_LOGIN_PATH);
    };
    return (
        <div>
            <Button onClick={onLogout}>Logout</Button>
        </div>
    );
}

export default Dashboard;

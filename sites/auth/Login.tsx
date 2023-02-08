import { AUTH_DASHBOARD_PATH } from '@/data/route';
import { useLogin } from '@/store/reducer/auth/authHooks';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

function Login() {
    const router = useRouter();
    const login = useLogin();

    const onLogin = () => {
        login();
        router.push(AUTH_DASHBOARD_PATH);
    };
    return (
        <div>
            <Button onClick={onLogin}>Login</Button>
        </div>
    );
}

export default Login;

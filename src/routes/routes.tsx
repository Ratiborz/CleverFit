import { Auth } from '@components/auth/auth';
import { ErrorUserExist } from '@components/result/error-user-exist/error-user-exist';
import { Error } from '@components/result/error/error';
import { Success } from '@components/result/success/success';
import { ErrorsPage } from '@pages/errors-page/errors';
import { MainPage } from '@pages/main-page';
import { RegistrationPage } from '@pages/registration-page';
import { Route, Routes } from 'react-router-dom';
import { Registration } from '../components/registration/registration';

export const routes = (
    <Routes>
        <Route path='/main' element={<MainPage />} />
        <Route path='/auth/*' element={<RegistrationPage />}>
            <Route index element={<Auth />} />
            <Route path='registration' element={<Registration />} />
        </Route>
        <Route path='result/*' element={<ErrorsPage />}>
            <Route path='success' element={<Success />} />
            <Route path='error' element={<Error />} />
            <Route path='error-user-exist' element={<ErrorUserExist />} />
        </Route>
    </Routes>
);

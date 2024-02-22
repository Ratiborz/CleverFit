import { Auth } from '@components/auth/auth/auth';
import { ChangePassword } from '@components/auth/change-password/change-password';
import { ConfirmEmail } from '@components/auth/confirm-email/confirm-email';
import { EmailNoExist } from '@components/result/email-no-exist/email-no-exist';
import { ErrorСhangePassword } from '@components/result/error-change-password/error-change-password';
import { ErrorCheckEmail } from '@components/result/error-check-email/error-check-email';
import { ErrorLogin } from '@components/result/error-login/error-login';
import { ErrorUserExist } from '@components/result/error-user-exist/error-user-exist';
import { Error } from '@components/result/error/error';
import { SuccessChangePassword } from '@components/result/success-change-password/success-change-password';
import { Success } from '@components/result/success/success';
import { ErrorsPage } from '@pages/errors-page/errors';
import { MainPage } from '@pages/main-page';
import { PasswordRecoveryPage } from '@pages/password-recovery';
import { RegistrationPage } from '@pages/registration-page';
import { isUserAuthenticated } from '@utils/storage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Registration } from '../components/auth/registration/registration';

export const routes = (
    <Routes>
        <Route path='/' element={<Navigate to={isUserAuthenticated() ? '/main' : '/auth'} />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/auth/*' element={<RegistrationPage />}>
            <Route index element={<Auth />} />
            <Route path='registration' element={<Registration />} />
        </Route>
        <Route path='/auth/*' element={<PasswordRecoveryPage />}>
            <Route path='confirm-email' element={<ConfirmEmail />} />
            <Route path='change-password' element={<ChangePassword />} />
        </Route>
        <Route path='result/*' element={<ErrorsPage />}>
            <Route path='success' element={<Success />} />
            <Route path='error-login' element={<ErrorLogin />} />
            <Route path='error' element={<Error />} />
            <Route path='error-user-exist' element={<ErrorUserExist />} />
            <Route path='error-check-email-no-exist' element={<EmailNoExist />} />
            <Route path='error-check-email' element={<ErrorCheckEmail />} />
            <Route path='error-change-password' element={<ErrorСhangePassword />} />
            <Route path='success-change-password' element={<SuccessChangePassword />} />
        </Route>
    </Routes>
);

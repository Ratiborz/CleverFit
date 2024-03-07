import { Auth } from '@components/auth/auth/auth';
import { ChangePassword } from '@components/auth/change-password/changePassword';
import { ConfirmEmail } from '@components/auth/confirm-email/confirmEmail';
import { EmailNoExist } from '@components/result/auth/email-no-exist/email-no-exist';
import { ErrorСhangePassword } from '@components/result/auth/error-change-password/error-change-password';
import { ErrorCheckEmail } from '@components/result/auth/error-check-email/error-check-email';
import { ErrorLogin } from '@components/result/auth/error-login/error-login';
import { ErrorUserExist } from '@components/result/auth/error-user-exist/error-user-exist';
import { Error } from '@components/result/auth/error/error';
import { SuccessChangePassword } from '@components/result/auth/success-change-password/success-change-password';
import { Success } from '@components/result/auth/success/success';
import { ErrorsPage } from '@pages/errors-page/errors';
import { MainPage } from '@pages/main-page';
import { PasswordRecoveryPage } from '@pages/password-recovery';
import { RegistrationPage } from '@pages/registration-page';
import { isUserAuthLocal } from '@utils/storage';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Registration } from '../components/auth/registration/registration';
import { Paths } from '@constants/paths';
import { FeedbackPage } from '@pages/feedback-page/feedbackPage';
import { CalendarPage } from '@pages/calendar-page/calendarPage';

export const routes = (
    <Routes>
        <Route
            path={Paths.HOME}
            element={<Navigate to={isUserAuthLocal() ? `${Paths.MAIN}` : `${Paths.AUTH}`} />}
        />
        <Route path={Paths.MAIN} element={<MainPage />}></Route>
        <Route path={Paths.FEEDBACKS} element={<FeedbackPage />} />
        <Route path={Paths.CALENDAR} element={<CalendarPage />} />
        <Route path={`${Paths.AUTH}/*`} element={<RegistrationPage />}>
            <Route index element={<Auth />} />
            <Route path={Paths.REGISTRATION} element={<Registration />} />
        </Route>
        <Route path={`${Paths.AUTH}/*`} element={<PasswordRecoveryPage />}>
            <Route path={Paths.CONFIRM_EMAIL} element={<ConfirmEmail />} />
            <Route path={Paths.CHANGE_PASSWORD} element={<ChangePassword />} />
        </Route>
        <Route path={`${Paths.RESULT}/*`} element={<ErrorsPage />}>
            <Route path={Paths.SUCCESS} element={<Success />} />
            <Route path={Paths.ERROR_LOGIN} element={<ErrorLogin />} />
            <Route path={Paths.ERROR} element={<Error />} />
            <Route path={Paths.USER_EXIST} element={<ErrorUserExist />} />
            <Route path={Paths.ERROR_CHECK_EMAIL_NO_EXIST} element={<EmailNoExist />} />
            <Route path={Paths.ERROR_CHECK_EMAIL} element={<ErrorCheckEmail />} />
            <Route path={Paths.ERROR_CHANGE_PASSWORD} element={<ErrorСhangePassword />} />
            <Route path={Paths.SUCESS_CHANGE_PASSWORD} element={<SuccessChangePassword />} />
        </Route>
    </Routes>
);

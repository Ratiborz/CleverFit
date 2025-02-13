import { Navigate, Route, Routes } from 'react-router-dom';
import { Auth } from '@components/auth/auth/auth';
import { ChangePassword } from '@components/auth/change-password/change-password';
import { ConfirmEmail } from '@components/auth/confirm-email/confirm-email';
import { EmailNoExist } from '@components/result/auth/email-no-exist/email-no-exist';
import { Error } from '@components/result/auth/error/error';
import { ErrorСhangePassword } from '@components/result/auth/error-change-password/error-change-password';
import { ErrorCheckEmail } from '@components/result/auth/error-check-email/error-check-email';
import { ErrorLogin } from '@components/result/auth/error-login/error-login';
import { ErrorUserExist } from '@components/result/auth/error-user-exist/error-user-exist';
import { Success } from '@components/result/auth/success/success';
import { SuccessChangePassword } from '@components/result/auth/success-change-password/success-change-password';
import { Paths } from '@constants/paths';
import { CalendarPage } from '@pages/calendar-page/calendar-page';
import { ErrorsPage } from '@pages/errors-page/errors';
import { FeedbackPage } from '@pages/feedback-page/feedback-page';
import { MainPage } from '@pages/main-page';
import { NotFoundPage } from '@pages/not-found-page';
import { PasswordRecoveryPage } from '@pages/password-recovery';
import { ProfilePage } from '@pages/profile-page';
import { RegistrationPage } from '@pages/registration-page';
import { SettingsPage } from '@pages/settings-page';
import { TrainingPage } from '@pages/training-page';
import { isUserAuthLocal } from '@utils/storage';

import { Registration } from '../components/auth/registration/registration';

export const routes = (
    <Routes>
        <Route
            path={Paths.HOME}
            element={<Navigate to={isUserAuthLocal() ? `${Paths.MAIN}` : `${Paths.AUTH}`} />}
        />
        <Route path={Paths.MAIN} element={<MainPage />} />
        <Route path={Paths.FEEDBACKS} element={<FeedbackPage />} />
        <Route path={Paths.CALENDAR} element={<CalendarPage />} />
        <Route path={Paths.PROFILE} element={<ProfilePage />} />
        <Route path={Paths.SETTINGS} element={<SettingsPage />} />
        <Route path={Paths.TRAINING} element={<TrainingPage />} />
        <Route path={`${Paths.AUTH}/*`} element={<RegistrationPage />}>
            <Route index={true} element={<Auth />} />
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
        <Route path='/*' element={<NotFoundPage />} />
    </Routes>
);

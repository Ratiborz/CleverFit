import { Error } from '@components/result/error/error';
import { ErrorsPage } from '@pages/errors-page/errors';
import { MainPage } from '@pages/main-page';
import { RegistrationPage } from '@pages/registration-page';
import { Route, Routes } from 'react-router-dom';

export const routes = (
    <Routes>
        <Route path='/main' element={<MainPage />} />
        <Route path='/auth/registration' element={<RegistrationPage />} />
        <Route path='result/*' element={<ErrorsPage />}>
            <Route path='success' element={<>успешный запрос</>} />
            <Route path='error' element={<Error />} />
            <Route path='error-user-exist' element={<>такая почта уже зарегана</>} />
        </Route>
    </Routes>
);

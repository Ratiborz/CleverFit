import { MainPage } from '@pages/main-page';
import { RegistrationPage } from '@pages/registration-page';
import { Route, Routes } from 'react-router-dom';

export const routes = (
    <Routes>
        <Route path='/main' element={<MainPage />} />
        <Route path='/auth/registration' element={<RegistrationPage />} />
        <Route path='/result/success' element={<>успешный запрос</>} />
        <Route path='/result/error' element={<>любая ошибка</>} />
        <Route path='/result/error-user-exist' element={<>такая почта уже зарегана</>} />
    </Routes>
);

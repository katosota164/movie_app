import laravelApiClient from '@/lib/laravelApiClient';

const initializeCsrf = async () => {
    await laravelApiClient.get('/sanctum/csrf-cookie');
};

export default initializeCsrf;

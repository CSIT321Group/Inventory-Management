import { axoisPrivate } from "../API/axois";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = axoisPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axoisPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axoisPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axoisPrivate.interceptors.request.eject(requestIntercept);
            axoisPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])
    return axoisPrivate;
}

export default useAxiosPrivate;
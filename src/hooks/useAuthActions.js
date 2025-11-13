import { useCallback } from "react";
import { useContextAuth } from "../context/AuthContext";
import { useLoginUserMutation, useUserSlice } from "../redux/store";
import useApiHandler from "./useApiHandler";
import { useMiniToggler } from "./useToggle";
import { extractErrorMessage } from "../utils/errorHandlers";

const AUTH_PROVIDERS = {
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
    LOCAL: 'local'
};

export const useAuthActions = () => {
    const { addUser } = useUserSlice();
    const [ handleMutation, handleApiCall ] = useApiHandler();
    const { signInWithFaceBook, signInWithGoogle } = useContextAuth();
    const [ loginUser, { isLoading } ] = handleMutation( useLoginUserMutation );
    const [ socialLoading, , startSocialLoading, stopSocialLoading ] = useMiniToggler( false );

    /**
     * Handles successful login
     */
    const handleLoginSuccess = useCallback( ( response ) => {
        if ( response?.success )
            addUser( response.data );

        return response?.message || "Login successful";
    }, [ addUser ] );

    /**
     * Handles login errors
     */
    const handleLoginError = useCallback( ( error ) =>
        extractErrorMessage( error, "Login failed. Please try again." ),
        [] );

    /**
     * Handle login for all providers
     */
    const handleLogin = useCallback( async ( formData, provider ) => {
        await loginUser(
            {
                provider,
                ...formData,
            },
            {
                onSuccess: handleLoginSuccess,
                onError: handleLoginError,
                redirectPath: "/",
            }
        );
    }, [ handleLoginError, handleLoginSuccess, loginUser ] );

    /**
     * Gets the appropriate social auth function for the provider
     */
    const getSocialAuthFunction = useCallback( ( provider ) => {
        switch ( provider ) {
            case AUTH_PROVIDERS.GOOGLE:
                return signInWithGoogle;
            case AUTH_PROVIDERS.FACEBOOK:
                return signInWithFaceBook;
            default:
                return null;
        }
    }, [ signInWithFaceBook, signInWithGoogle ] );

    /**
     * Extracts email and uid from social auth response
     */
    const extractUserInfo = useCallback( ( response ) => {
        const email = response?.user?.email || response?.user?.providerData?.[ 0 ]?.email;
        const uid = response?.user?.uid;

        return { email, uid };
    }, [] );

    /**
     * Handles social provider authentication
     */
    const loginWithSocial = useCallback( async ( provider ) => {
        startSocialLoading();
        handleApiCall( getSocialAuthFunction( provider ), null,
            {
                onSuccess: async ( res ) =>
                    await handleLogin( extractUserInfo( res ), provider )
                ,
                onError: handleLoginError,
                onFinally: stopSocialLoading,
            }
        );

    }, [
        extractUserInfo,
        getSocialAuthFunction,
        handleApiCall,
        handleLogin,
        handleLoginError,
        startSocialLoading,
        stopSocialLoading
    ] );

    return {
        loginWithEmail: ( data ) => handleLogin( data, AUTH_PROVIDERS.LOCAL ),
        loginWithFaceBook: () => loginWithSocial( AUTH_PROVIDERS.FACEBOOK ),
        loginWithGoogle: () => loginWithSocial( AUTH_PROVIDERS.GOOGLE ),
        loginLoading: isLoading || socialLoading
    };
};
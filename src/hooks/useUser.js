import { useEffect, useState } from 'react';
import {
    useFetchAllUsersQuery,
    useFetchUserByIdQuery,
    useForgotPasswordMutation,
    useUpdateUserMutation,
    useUpdateUserPasswordMutation,
    useUpdateUserStatusMutation
} from '../redux/store';
import useApiHandler from './useApiHandler';

const useUser = ( { searchTerm = '', sort = '', status = [], userId = null } = {} ) => {
    const [ handleMutation ] = useApiHandler();
    const [ usersData, setUsersData ] = useState( [] );
    const [ userData, setUserData ] = useState( {} );

    // --- Fetch all users ---
    const {
        data: allUsersData,
        isLoading: isUsersLoading,
        error: usersError,
        isFetching,
        refetch: refetchUsers
    } = useFetchAllUsersQuery(
        { searchTerm, sort, status },
        { refetchOnMountOrArgChange: true }
    );

    useEffect( () => {
        if ( allUsersData && allUsersData?.success ) {
            setUsersData( allUsersData.data );
        }
    }, [ allUsersData ] );

    // --- Fetch single user by ID ---
    const {
        data: userDetails,
        isLoading: isUserLoading,
        isFetching: isUserFetching,
        error: userError
    } = useFetchUserByIdQuery( userId, {
        skip: !userId // Only run if userId is provided
    } );

    useEffect( () => {
        if ( userDetails && userDetails?.success ) {
            setUserData( userDetails.data );
        }
    }, [ userDetails ] );

    // --- Update user status ---
    const [ updateUserStatus, { isLoading: isStatusUpdating } ] = handleMutation(
        useUpdateUserStatusMutation
    );
    const [
        updateUser,
        updateUserResult, //{isLoading,isError,isSuccess}
    ] = handleMutation( useUpdateUserMutation );
    const [
        updatePassword,
        updatePasswordResult, //{isLoading,isError,isSuccess}
    ] = handleMutation( useUpdateUserPasswordMutation );
    const [
        forgotPassword,
        forgotPasswordResult, //{isLoading,isError,isSuccess}
    ] = handleMutation( useForgotPasswordMutation );

    return {
        // All users
        usersData,
        isUsersLoading,
        usersError,
        isFetching,
        refetchUsers,

        // Single user
        userDetails, userData,
        isUserLoading,
        isUserFetching,
        userError,

        // Update status
        updateUserStatus,
        isStatusUpdating,

        // Update user
        updateUser,
        updateUserResult,

        // Update user password
        updatePassword,
        updatePasswordResult,

        // change user password
        forgotPassword,
        forgotPasswordResult,

    };
};

export default useUser;

import { useCallback, useEffect } from 'react';
import {
    useFetchAllUsersQuery,
    useFetchUserByIdQuery,
    useForgotPasswordMutation,
    useUpdateUserMutation,
    useUpdateUserPasswordMutation,
    useUpdateUserStatusMutation,
    useUserSlice
} from '../redux/store';
import useApiHandler from './useApiHandler';
import { USER_ROLES } from '../constants/app';
import { useAuth } from './useAuth';
import { submitHandler } from '../utils/generals';

/**
 * Custom hook for user management operations
 * @param {Object} options
 * @param {string} options.searchTerm - Search filter term
 * @param {string} options.sort - Sort criteria
 * @param {Array} options.status - Status filter array
 * @param {string} options.userId - Specific user ID for details
 * @param {string} options.userRole - User role for authentication
 */
const useUser = ( {
    searchTerm = '',
    sort = '',
    status = [],
    userId = null,
    userRole = USER_ROLES.CLIENT
} = {} ) => {
    const { validateAuthentication } = useAuth( userRole )
    const { removeUser } = useUserSlice()
    const [ handleMutation ] = useApiHandler();

    // --- Fetch all users ---
    const {
        data: usersData,
        isLoading: isUsersLoading,
        error: usersError,
        isFetching: isUsersFetching,
        isError: isUsersError,
        refetch: refetchUsers
    } = useFetchAllUsersQuery(
        { searchTerm, sort, status },
        {
            refetchOnMountOrArgChange: true,
            selectFromResult: ( { data, ...rest } ) => ( {
                data: data?.success ? data.data : [],
                ...rest
            } )

        },

    );

    // --- Fetch single user by ID ---
    const {
        data: userData,
        isLoading: isUserLoading,
        isFetching: isUserFetching,
        error: userError,
        isError: isUserError
    } = useFetchUserByIdQuery( userId, {
        skip: !userId,// Only run if userId is provided
        selectFromResult: ( { data, ...rest } ) => ( {
            data: data?.success ? data.data : {},
            ...rest
        } )
    },
    );

    // --- User Operations ---
    const [
        updateUserStatus,
        updateUserStatusResult
    ] = handleMutation( useUpdateUserStatusMutation );
    const [
        updateUser,
        updateUserResult,
    ] = handleMutation( useUpdateUserMutation );
    const [
        updatePassword,
        updatePasswordResult,
    ] = handleMutation( useUpdateUserPasswordMutation );
    const [
        forgotPassword,
        forgotPasswordResult,
    ] = handleMutation( useForgotPasswordMutation );

    const isTokenExpiredError = useCallback( ( error ) => {
        return error?.status === 401 && error?.data?.error?.name === 'TokenExpiredError';
    }, [] );

    const handleToken = useCallback( async () => {
        await removeUser();
        validateAuthentication( 'your token is expired . please login again', userRole );
    }, [ removeUser, validateAuthentication, userRole ] );

    // Token expiration monitoring
    useEffect( () => {
        const errors = [
            usersError,
            userError,
            updateUserResult.error,
            updatePasswordResult.error,
            forgotPasswordResult.error
        ];

        const hasTokenExpired = errors.some( error => isTokenExpiredError( error ) );

        if ( hasTokenExpired ) {
            handleToken();
        }
    }, [
        forgotPasswordResult.error,
        updatePasswordResult.error,
        updateUserResult.error,
        userError,
        usersError,
        isTokenExpiredError,
        handleToken
    ] );

    /**
     * Handles user status update 
     * @param {string} id - User ID to update
     * @param {string} status - New status value
     */
    const handleUpdateUserStatus = ( id, status ) => submitHandler(
        updateUserStatus, //mutation function
        { id, status }, //data
        "Updated successfully", //success message
        "Failed to update user status. Please try again" //error message
    );

    return {
        // All users
        usersData,
        isUsersLoading,
        isUsersFetching,
        usersError,
        isUsersError,
        refetchUsers,

        // Single user
        userData,
        isUserLoading,
        isUserFetching,
        userError,
        isUserError,

        // Update status
        updateUserStatus, handleUpdateUserStatus,
        isStatusUpdating: updateUserStatusResult.isLoading,

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

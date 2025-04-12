import { useEffect, useState } from 'react';
import {
    useFetchAllUsersQuery,
    useFetchUserByIdQuery,
    useUpdateUserStatusMutation
} from '../redux/store';
import useApiHandler from './useApiHandler';

const useUser = ( { searchTerm = '', sort = '', status = [], userId = null } = {} ) => {
    const [ handleMutation ] = useApiHandler();
    const [ usersData, setUsersData ] = useState( [] );

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
        error: userError
    } = useFetchUserByIdQuery( userId, {
        skip: !userId // Only run if userId is provided
    } );

    // --- Update user status ---
    const [ updateUserStatus, { isLoading: isStatusUpdating } ] = handleMutation(
        useUpdateUserStatusMutation
    );

    return {
        // All users
        usersData,
        isUsersLoading,
        usersError,
        isFetching,
        refetchUsers,

        // Single user
        userDetails,
        isUserLoading,
        userError,

        // Update status
        updateUserStatus,
        isStatusUpdating
    };
};

export default useUser;

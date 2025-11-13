import { useCallback, useState } from "react";
import { useMiniToggler } from "./useToggle";
import useApiHandler from "./useApiHandler";
import { BASE_URL } from "../constants/app";
import axios from "axios";
import { extractErrorMessage } from "../utils/errorHandlers";
import { INITIAL_DASHBOARD_STATE } from "../constants/dashboard";



const useDashboard = () => {
    const [ data, setData ] = useState( INITIAL_DASHBOARD_STATE );
    const [ dashboardData, setDashboardData ] = useState( () => ( {
        stats: {
            totalUsers: 0,
            totalOrders: 0,
            totalRevenue: 0,
            lowStockCount: 0,
            pendingEnquiryCount: 0,
            pendingOrderCount: 0,
        },
        lists: {
            pendingOrders: [],
            pendingEnquiries: [],
            expiredCoupons: [],
            lowStockItems: [],
        },
        revenueData: [],
    } ) );

    const [ isLoading, , startLoading, stopLoading ] = useMiniToggler();
    const [ error, setError ] = useState( null );
    const [ , handleApiCall ] = useApiHandler();

    const fetchDashboard = useCallback( () => {
        return handleApiCall(
            () => axios.get( `${ BASE_URL }/api/admin/` ), null,
            {
                onSuccess: ( response ) => {
                    setData( {
                        stats: response.data.stats || INITIAL_DASHBOARD_STATE.stats,
                        lists: response.data.lists || INITIAL_DASHBOARD_STATE.lists,
                        revenueData: response.data.revenueData || INITIAL_DASHBOARD_STATE.revenueData
                    } );
                    return "Dashboard data loaded";
                },
                onError: ( err ) => {
                    const errorMsg = extractErrorMessage(
                        err,
                        "Failed to load dashboard data. Please try again."
                    );
                    setError( errorMsg );
                    return errorMsg
                },
            }
        );
    }, [ handleApiCall ] );

    const refetch = useCallback( async () => {
        setError( null );
        startLoading();
        await fetchDashboard();
        stopLoading();
    }, [ fetchDashboard, startLoading, stopLoading ] );

    return {
        data,
        isLoading,
        error,
        refetch
    };
};

export default useDashboard
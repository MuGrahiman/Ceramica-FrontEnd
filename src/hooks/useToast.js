import { useCallback } from "react";
import { toast } from "react-toastify";

/**
 * A hook for displaying toast notifications.
 * @returns {Function} - Function to display toast messages.
 */
const useToast = () => {
    const showToast = useCallback((message, type = "default") => {
        const toastTypes = {
            success: toast.success,
            error: toast.error,
            warning: toast.warning,
            info: toast.info,
            default: toast,
        };

        // Call the appropriate toast method based on the provided type
        const toastMethod = toastTypes[type] || toast;
        toastMethod(message);
    }, []);

    return showToast;
};

export default useToast;

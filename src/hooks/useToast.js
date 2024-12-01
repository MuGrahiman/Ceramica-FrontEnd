import { useCallback } from "react";
import { toast } from "react-toastify";

const useToast = () => {
	const showToast = useCallback((message, type = 'default') => {
		if (typeof message !== 'string') {
			console.error('Toast message must be a string');
			return;
		}

		switch (type) {
			case 'success':
				toast.success(message);
				break;
			case 'error':
				toast.error(message);
				break;
			case 'warning':
				toast.warning(message);
				break;
			case 'info':
				toast.info(message);
				break;
			default:
				toast(message);
		}
	}, []);

	return showToast;
};

export default useToast;

import React from "react";
import PropTypes from "prop-types";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const client_id = import.meta.env.VITE_APP_PAYPAL_CLIENT_ID;

// 🔹 PayPal SDK Configuration
const PAYPAL_OPTIONS = {
	"client-id": client_id,
	"enable-funding": "paypal", // Allow only card & credit
	"disable-funding": "card,credit,venmo,paylater", // Disable all other payment methods
	"buyer-country": "US",
	currency: "USD",
	components: "buttons",
	"data-page-type": "product-details",
	"data-sdk-integration-source": "developer-studio",
};

function PayPalButton({
	isLoading = false,
	createOrder,
	onApprove,
	onError,
	onCancel,
}) {
	return (
		<div className="PayPalButton">
			<PayPalScriptProvider options={PAYPAL_OPTIONS}>
				<PayPalButtons
					style={{
						shape: "pill",
						layout: "vertical",
						color: "blue",
						label: "paypal",
					}}
					disabled={isLoading}
					onError={onError}
					onCancel={onCancel}
					createOrder={createOrder}
					onApprove={onApprove}
				/>
			</PayPalScriptProvider>
		</div>
	);
}

// 🔹 PropTypes for the component
PayPalButton.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	createOrder: PropTypes.func.isRequired,
	onApprove: PropTypes.func.isRequired,
	onError: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
};

export default PayPalButton;

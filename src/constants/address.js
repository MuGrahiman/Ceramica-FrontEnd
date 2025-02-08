export const ADDRESS_VALIDATION_RULES = {
    firstName: {
        required: "First Name is required.",
        minLength: { value: 3, message: "First Name must be at least 3 characters long." },
    },
    lastName: {
        required: "Last Name is required.",
        minLength: { value: 3, message: "Last Name must be at least 3 characters long." },
    },
    email: {
        required: "Email is required.",
        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address." },
    },
    phoneNumber: {
        required: "Phone Number is required.",
        pattern: { value: /^[0-9]{10,}$/, message: "Phone Number must be at least 10 digits." },
    },
    street: { required: "Street Address is required." },
    city: { required: "Town/City is required." },
    state: { required: "State is required." },
    country: { required: "Country is required." },
    zipCode: {
        required: "Zip Code is required.",
        pattern: { value: /^[0-9]{5,}$/, message: "Zip Code must be at least 5 digits." },
    },
    isDefault: {
		validate: (value) => typeof value === "boolean" || "Invalid selection.",
	},
};

export const ADDRESS_FORM_FIELDS = [
    { NAME: "firstName", LABEL: "First Name", TYPE: "text", PLACEHOLDER: "Enter your first name" },
    { NAME: "lastName", LABEL: "Last Name", TYPE: "text", PLACEHOLDER: "Enter your last name" },
    { NAME: "email", LABEL: "Email Address", TYPE: "email", PLACEHOLDER: "email@domain.com", DISABLED: true },
    { NAME: "phoneNumber", LABEL: "Phone Number", TYPE: "tel", PLACEHOLDER: "+123 456 7890" },
    { NAME: "street", LABEL: "Street Address", TYPE: "text", PLACEHOLDER: "Enter your address" },
    { NAME: "city", LABEL: "Town/City", TYPE: "text", PLACEHOLDER: "Enter your town/city" },
    { NAME: "state", LABEL: "State", TYPE: "text", PLACEHOLDER: "Enter your state" },
    { NAME: "country", LABEL: "Country", TYPE: "text", PLACEHOLDER: "Enter your country" },
    { NAME: "zipCode", LABEL: "Zip Code", TYPE: "text", PLACEHOLDER: "Enter your zip code" },
];


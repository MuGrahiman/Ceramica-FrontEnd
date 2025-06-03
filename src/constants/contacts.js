
export const CONTACT_FORM_FIELDS = {
    NAME: "name",
    EMAIL: "email",
    ORDER_ID: "orderId",
    SUBJECT: "subject",
    MESSAGE: "message",
};

export const CONTACT_SUBJECTS = {
    FEEDBACK: "feedback",
    GENERAL_INQUIRY: "general",
    ORDER_SUPPORT: "order",
    RETURN_AND_REFUND: "returns",
    WHOLESALE_ENQUIRY: "wholesale",
}

export const CONTACT_SUBJECT_OPTIONS = [
    { value: CONTACT_SUBJECTS.FEEDBACK, label: "Website Feedback" },
    { value: CONTACT_SUBJECTS.GENERAL_INQUIRY, label: "General Inquiry" },
    { value: CONTACT_SUBJECTS.ORDER_SUPPORT, label: "Order Support" },
    { value: CONTACT_SUBJECTS.RETURN_AND_REFUND, label: "Return and Refund" },
    { value: CONTACT_SUBJECTS.WHOLESALE_ENQUIRY, label: "Wholesale Enquiry" },
];

export const CONTACT_FORM_FIELDS_OPTIONS = [
    {
        NAME: CONTACT_FORM_FIELDS.NAME,
        LABEL: "Full Name",
        TYPE: "text",
        PLACEHOLDER: "Enter your full name",
    },
    {
        NAME: CONTACT_FORM_FIELDS.EMAIL,
        LABEL: "Email Address",
        TYPE: "email",
        PLACEHOLDER: "you@example.com",
    },
    {
        NAME: CONTACT_FORM_FIELDS.SUBJECT,
        LABEL: "Subject",
        TYPE: "select",
        OPTIONS: CONTACT_SUBJECT_OPTIONS,
    },
    {
        NAME: CONTACT_FORM_FIELDS.ORDER_ID,
        LABEL: "Order ID",
        TYPE: "text",
        PLACEHOLDER: "Enter your order ID",
        CONDITIONAL_ON: { FIELD: "subject", VALUE: "order" },
    },
    {
        NAME: CONTACT_FORM_FIELDS.MESSAGE,
        LABEL: "Message",
        TYPE: "textarea",
        PLACEHOLDER: "Write your message here...",
    },
];

export const CONTACT_FORM_VALIDATION_RULES = {
    [ CONTACT_FORM_FIELDS.NAME ]: {
        required: "Name is required.",
        minLength: {
            value: 2,
            message: "Name must be at least 2 characters long.",
        },
    },

    [ CONTACT_FORM_FIELDS.EMAIL ]: {
        required: "Email is required.",
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Please enter a valid email.",
        },
    },

    [ CONTACT_FORM_FIELDS.SUBJECT ]: {
        required: "Subject is required.",
    },

    [ CONTACT_FORM_FIELDS.ORDER_ID ]: {
        required: "Order ID is required for order support.",
    },

    [ CONTACT_FORM_FIELDS.MESSAGE ]: {
        required: "Message is required.",
        minLength: {
            value: 100,
            message: "Message must be at least 100 characters long.",
        },
    },
};

import { FILTER_FORMS_COMPONENTS } from "./filter-form";

/**
 * User status enumeration for type safety
 * @enum {string}
 */
export const USER_STATUS = {
    PENDING: "pending",
    REGISTERED: "registered",
    VERIFIED: "verified", 
    BLOCKED: "blocked"
};

/**
 * Default values for user filter forms
 * @type {Object}
 */
export const USER_FILTER_FORMS_DEFAULT_VALUES = {
    status: [],
    sort: "", 
};

/**
 * Configuration for user filter form fields and options
 * @type {Array<Object>}
 */
export const USER_FILTER_FIELD_CONTENTS = [
    {
        title: "Filter by Status",
        type: FILTER_FORMS_COMPONENTS.CHECKBOX,
        props: {
            name: "status",
            options: [
                { value: USER_STATUS.PENDING, label: "Pending Verification" },
                { value: USER_STATUS.REGISTERED, label: "Registered" },
                { value: USER_STATUS.VERIFIED, label: "Verified" },
                { value: USER_STATUS.BLOCKED, label: "Blocked" }
            ],
        },
    },
    {
        title: "Sort By",
        type: FILTER_FORMS_COMPONENTS.RADIO,
        props: {
            name: "sort",
            options: [
                { value: "newest", label: "Newest First" },
                { value: "oldest", label: "Oldest First" },
            ],
        },
    },
];

/**
 * Mapping of user statuses to color themes for UI consistency
 * @type {Object}
 */
export const USER_STATUS_COLOR_MAP = {
    [USER_STATUS.REGISTERED]: "yellow",
    [USER_STATUS.VERIFIED]: "green",
    [USER_STATUS.PENDING]: "orange",
    [USER_STATUS.BLOCKED]: "red"
};

/**
 * Initial number of activity log items to display before expansion
 * @type {number}
 */
export const INITIAL_ACTIVITY_LOG_LENGTH = 3;

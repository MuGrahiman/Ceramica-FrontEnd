import { FILTER_FORMS_COMPONENTS } from "./filter-form";
/**
 * Inquiry Field contents for filter form 
 */
export const INQUIRY_FIELD_CONTENTS = [
    {
        title: "Filter by status",
        type: FILTER_FORMS_COMPONENTS.RADIO,
        props: {
            name: "status",
            options: [
                { value: "pending", label: "Pending query" },
                { value: "resolved", label: "Resolved query" },
            ],
        },
    },
    {
        title: "Sort",
        type: FILTER_FORMS_COMPONENTS.RADIO,
        props: {
            name: "sort",
            options: [
                { value: "newest", label: "Newest query" },
                { value: "oldest", label: "Oldest query" },
            ],
        },
    },
];

export const INQUIRY_FILTER_FORMS_DEFAULT_VALUES = {
    status: [],
    sort: "",
};
export const INQUIRY_SWAL_CONFIG = {
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#b10202",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
}
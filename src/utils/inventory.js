// Function to get breadcrumb items
export const getBreadCrumbItems = (title) => {
    return [
        { label: "Inventory", to: "/dashboard/inventory" },
        { label: title },
    ];
};

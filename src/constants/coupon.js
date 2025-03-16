export const COUPON_FORM_FIELDS = [
    "title",
    "validFrom",
    "validUntil",
    "minimumPurchaseAmount",
    "discount",
    "usageLimit",
    "status",
    "description",
]
export const COUPON_URL = "/dashboard/Coupon"
export const COUPON_BREAD_CRUMB_ITEMS = ( Title ) => [
    { label: "Coupon", to: COUPON_URL },
    { label: Title },
]
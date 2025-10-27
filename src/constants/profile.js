import { createDefaultState } from "../utils/generals";
import { PASSWORD_NAME_FIELDS, PROFILE_TABS } from "./toggle";

export const PROFILE_TABS_ARRAY = [
    { label: "Profile Log", key: PROFILE_TABS.PROFILE },
    { label: "Address Log", key: PROFILE_TABS.ADDRESS },
];

export const PASSWORD_NAME_FIELDS_ARRAY = Object.values( PASSWORD_NAME_FIELDS )
export const DEFAULT_FORM_VALUE = createDefaultState( PASSWORD_NAME_FIELDS_ARRAY, "" );
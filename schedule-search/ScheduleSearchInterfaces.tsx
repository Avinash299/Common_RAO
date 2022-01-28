
interface VendorInterface {
    vendor: string;
    vendorId: string;
    source: string;
    majorDepartment: string;
    minorDepartment: string;
}
const initialState = {
    namedSchedule: "", storeId: "", majorDepartment: "", minorDepartment: "", vendorId: "", orderDay: "",
    source: "", district: "", orderCutoffTime: "", deliveryDay: "", deliveryWindowBegin: "", deliveryWindowEnd: ""
};
export type { VendorInterface };
export { initialState };
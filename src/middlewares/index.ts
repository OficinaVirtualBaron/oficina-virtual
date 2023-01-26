import * as isUserRole from "./validateUser";
import * as isMuniRole from "./validateMuni";
import * as isAdminRole from "./validateAdmin";
import * as isUserOrMuni from "./validateMuniAndUser"

export interface IPayload {
    id: string;
    role: string;
    category: string;
    iat: number;
    exp: number;
}

export { isUserRole, isMuniRole, isAdminRole, isUserOrMuni };
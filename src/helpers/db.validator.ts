import { User } from "../entities/User";

export const cuilExist = async(req: Request, res: Response, cuil) => {
    const existeCuil = await User.findOne(cuil);
    if (existeCuil) {
        throw new Error (`El CUIL ${cuil} ya se encuentra registrado`)
    }
}
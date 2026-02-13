import { sgcApi } from "@/api/SgcApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const loginAction = async(email: string ,password:string):Promise<AuthResponse> =>
    {
        try {
            const { data } = await sgcApi.post('/Auth/login',{
                email:email,
                password:password,
            });
            console.log(data);

            return data;
        } catch (error) {
           console.log(error);
            throw error;
        }

    }
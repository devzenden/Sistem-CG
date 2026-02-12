
export const loginAction = async(email: string ,password:string):Promise<AuthResponse> =>
    {
        try {
            const { data } = await tesloApi.post('/auth/login',{
                email:email,
                password:password,
            });
           // console.log(data);

            return data;
        } catch (error) {
          //  console.log(error);
            throw error;
        }

    }
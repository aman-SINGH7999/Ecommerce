import bcryptjs from 'bcryptjs'

export const hashPassword = async (password)=>{
    try{
        const salt = 10;
        const hashedPassword = await bcryptjs.hash(password,salt);
        return hashedPassword;
    }catch(err){
        // console.log(err);
    }
}


export const comparePassword = async (password, hashedPassword)=>{
    return await bcryptjs.compare(password,hashedPassword)
}
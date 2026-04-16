import  bcrypt  from 'bcrypt';
export const hashedPassword= (password:string)=>{
    const salt=10;
    const hashedPassword=bcrypt.hashSync(password,salt);
    return hashedPassword;
}

export const comparePassword=(password:string,hashedPassword:string)=>{
    const isPasswordMatch=bcrypt.compare(password,hashedPassword);
    return isPasswordMatch;
}



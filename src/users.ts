export interface NewUser {
    firstName: string
    lastName : string 
    email : string 
    contactDetails : string | number 
    password : string 
    confirmPassword : string 
}

export interface SignInUser{
  username:string 
  password:string

}

export interface User extends NewUser {
  id: string
}

export interface userSingIn extends SignInUser{
  id: string
}
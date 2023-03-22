export interface Status {
  valid: boolean
  message?: string
}

type Rule = (value: string) => Status
type isPasswordSameRule = (password:string,confirmPassword:string) =>Status

export function length ({ min, max }: { min: number, max: number }): Rule {
  return function (value: string): Status {
    const result = Boolean(value.length >= min && value.length <= max)

    return {
      valid: result,
      message: result ? undefined : `This field must be between ${min} and ${max}`
    }
  }
}

export const required: Rule = (value: string): Status => {
  const result = Boolean(value)

  return {
    valid: result,
    message: result ? undefined : 'This field is required'
  }
}

export const validatePassword : isPasswordSameRule = (password :string ,confirmPassword :string ) : Status =>{
  let result = Boolean(password)
  if(password === confirmPassword){
    result = true;
  }else{
    result = false;
  }
    return {
      valid:result,
      message: result ? undefined : 'Password is not same'
    }
}
export function validate (value: string, rules: Rule[]): Status {
  for (const rule of rules) {
    const result = rule(value)
    if (!result.valid) {
      return result
    }
  }

  return {
    valid: true
  }
}

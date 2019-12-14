import React, { useState } from 'react';

interface LoginErrors {
	username: Error
	password: Error
}

interface Error {
	valid: boolean
	message: string
}

interface FieldProps {
	errors: LoginErrors
	attribute: string
	children: any
}

const Field: React.FC<FieldProps> = (props: FieldProps) => {
	const error = (props as any).errors[props.attribute];
	return (
		<div>
			{ !error.valid && 
				<div>
					{error.message} 
				</div>
			}
			{props.children}
		</div>
	);
}

const Login: React.FC = () => {

  const [ errors, setErrors ] = useState({
  	'username' : {
  		'valid' : true,
  		'message' : ''
  	},
  	'password' : {
  		'valid' : true,
  		'message' : ''
  	}
  } as LoginErrors);

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const validate = (type: string, value: string): void => {

  	let valid = true;
  	let message = '';

  	if(type === 'username' && value.length > 6){
  		valid = false;
  		message = 'too long'
  	}

  	if(type === 'password' && value.length > 3){
  		valid = false;
  		message = 'too long'
  	}

  	const _errors = errors;

  	(_errors as any)[type] = {
  		valid,
  		message
  	};

  	setErrors(_errors)

  }

  const setValue = (fn: (value: string) => void, validationType: string) => {
  	return (e: any) => {
  		fn(e.target.value);
  		validate(validationType, e.target.value);
  	}
  }

  return (
    <div className="login">
    	<Field errors={errors} attribute='username'>
    		<input type="text" onChange={setValue(setUsername, 'username')} value={ username } />
    	</Field>
    	<Field errors={errors} attribute='password'>
    		<input type="text" onChange={setValue(setPassword, 'password')} value={ password } />
    	</Field>
    </div>
  );
}

export default Login;

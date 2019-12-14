import React, { useState, useEffect } from 'react';

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
	const error = props.errors[props.attribute as keyof LoginErrors];
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

interface FieldError {
	type: string
	value: any
}

function useErrors(fields: FieldError[]): LoginErrors {

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

  useEffect(() => {

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

		fields.map(field => validate(field.type, field.value));

  }, [errors, fields]);

  return errors;

}

const Login: React.FC = () => {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const errors = useErrors([
	  {
	  	type: 'username',
	  	value: username	
	  },
	  {
	  	type: 'password',
	  	value: password	
	  }
  ])

  const setValue = (fn: (value: string) => void, validationType: string) => {
  	return (e: any) => {
  		fn(e.target.value);
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

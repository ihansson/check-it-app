import React, { useState, useEffect } from 'react';
import './Login.scss';

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
	attribute: string,
	value: string,
	children: any
}

const Field: React.FC<FieldProps> = (props: FieldProps) => {
	const error = props.errors[props.attribute as keyof LoginErrors];
	return (
		<div>
			{props.children}
			{ !error.valid && props.value &&
				<div className="App-error">
					{error.message} 
				</div>
			}
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
  		'valid' : false,
  		'message' : 'too short'
  	},
  	'password' : {
  		'valid' : false,
  		'message' : 'too short'
  	}
  } as LoginErrors);

  useEffect(() => {

		const validate = (type: string, value: string): void => {

			let valid = true;
			let message = '';

			if(type === 'username' && value.length < 6){
				valid = false;
				message = 'too short'
			}

			if(type === 'password' && value.length < 6){
				valid = false;
				message = 'too short'
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

  const [ loading, setLoading ] = useState(false);

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

  const valid = Object.values(errors).reduce((current: boolean, field: Error) => {
  	return !current ? false : field.valid;
  }, true);

  const setValue = (fn: (value: string) => void, validationType: string) => {
  	return (e: any) => {
  		fn(e.target.value);
  	}
  }

  let timeout: boolean |  ReturnType<typeof setTimeout> = false;

  const submitForm = (e: any) => {
  	e.preventDefault();
  	setLoading(true);
  	if(timeout) {
  		clearTimeout(timeout as ReturnType<typeof setTimeout>);
  	}
  	timeout = setTimeout(() => {
  		setLoading(false);
  	}, 250)
  	return false;
  }

  return (
    <div className="App-page">
    	<div className="App-box">
    		<h1>Login</h1>
    		<p>Integer interdum nisl in arcu pharetra, quis dignissim.</p>
	    	<form onSubmit={submitForm}>
		    	<Field errors={errors} attribute='username' value={username}>
		    		<input className="App-input-line" placeholder="Username" type="text" onChange={setValue(setUsername, 'username')} value={ username } />
		    	</Field>
		    	<Field errors={errors} attribute='password' value={password}>
		    		<input className="App-input-line" placeholder="Password" type="text" onChange={setValue(setPassword, 'password')} value={ password } />
		    	</Field>
		    	<button className="App-button" disabled={!valid}>
		    		{ loading && 'Loading' }
		    		{ !loading && 'Submit' }
		    	</button>
	    	</form>
    	</div>
    </div>
  );
}

export default Login;

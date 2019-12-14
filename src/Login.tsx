import React, { useState } from 'react';

const Login: React.FC = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const setValue = (fn: (value: string) => void) => {
  	return (e: any) => {
  		fn(e.target.value);
  	}
  }
  return (
    <div className="login">
    	<input type="text" onChange={setValue(setUsername)} value={ username } />
    	<input type="text" onChange={setValue(setPassword)} value={ password } />
    </div>
  );
}

export default Login;

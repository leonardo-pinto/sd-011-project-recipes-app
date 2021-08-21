import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkEmailAndPass = (e, p) => {
    const validEmail = /^[a-z]+@[a-z]+\.[com]{3,}$/i;
    const passLength = 6;
    return validEmail.test(e) && p.length > passLength;
  };

  const setLocalStorage = (emailUser) => {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email: emailUser }));
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            data-testid="email-input"
            id="email-input"
            placeholder="Email"
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </Form.Group>

        <Link to="/comidas">
          <Button
            variant="light"
            type="submit"
            data-testid="login-submit-btn"
            disabled={ email && password ? !(checkEmailAndPass(email, password)) : true }
            onClick={ () => setLocalStorage(email) }
          >
            Go!
          </Button>
        </Link>
      </Form>
    </div>
  );
}

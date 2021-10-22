import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { waitFor } from '@testing-library/dom';
import LoginForm from './LoginForm'
import { ProvideAuth } from '../useAuth'

test('<LoginForm /> updates parent state and calls onSubmit', async () => {
  const mockSignInWithEmailAndPassword = jest.fn().mockResolvedValue()

  const component = render(
    <ProvideAuth signInWithEmailAndPassword={mockSignInWithEmailAndPassword}>
      <LoginForm setErrorMessage={() => console.log('error')}/>
    </ProvideAuth>
  );

  const usernameInput = component.getByPlaceholderText(/username/i)
  const passwordInput = component.getByPlaceholderText(/password/i)
  const form = component.container.querySelector('form')

  const usernameValue =  'raulingg'
  const passwordValue = '1234456'

  fireEvent.change(usernameInput, { 
    target: { value: usernameValue }
  })

  fireEvent.change(passwordInput, { 
    target: { value: passwordValue }
  })

  fireEvent.submit(form)

  await waitFor(() => {
    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledWith(usernameValue, passwordValue);
    expect(screen.getByText(/raulingg/i)).toBeInTheDocument();
  })
})
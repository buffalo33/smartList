import 'react-native'
import React from 'react'
import HomeScreen from '../src/screens/HomeScreen'
import renderer from 'react-test-renderer'
import SignInScreen from '../src/screens/SignInScreen';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { render } from 'react-native-testing-library';
import firebase from 'firebase'

it('should ', async () => {
  const email = 'id@gmail.com';
  const { getByTestId } = render(<SignInScreen />)

  const emailInput = getByTestId("TEST_ID_EMAIL_INPUT");
  const button = getByTestId("TEST_ID_BUTTON_SUBMIT");

  await waitFor(() => {
    fireEvent.changeText(emailInput, email),
      expect(emailInput.props.value).toBe(email);
    fireEvent.press(button);
    expect(getByTestId(`passwordInputError`)).toBeDefined();

  })

});
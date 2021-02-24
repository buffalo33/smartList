import React from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import SignInScreen from '../../src/screens/SignInScreen'

describe('SignInScreen tests', () => {
  it('should renders default elements', () => {
    const { getAllByText } = render(<SignInScreen />);
    console.log(getAllByText("ShoppingList"));

  });

});
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
/* Mock that test 
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    product_name: 'First Item',
    image_front_thumb_url: "https://static.openfoodfacts.org/images/products/611/103/500/0027/ingredients_fr.27.400.jpg",
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    product_name: 'Second Item',
    image_front_thumb_url: "https://static.openfoodfacts.org/images/products/611/103/500/0027/front.3.200.jpg"

  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    product_name: 'Third Item',
    image_front_thumb_url: "https://static.openfoodfacts.org/images/products/611/103/500/0027/front.3.200.jpg"

  },
];
*/
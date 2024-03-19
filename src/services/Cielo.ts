import {NativeModules} from 'react-native';

class Cielo {
  async payment() {
    const json = {
      accessToken: 'ffQadIhSGruY81TYO9Zb0POFBLzTQ7beBxf64JofgXxxe4aSfI / BAazOOc0PTf6tFvsezu79fTft2aMF5qMwBh17nAZyWLUjb9GN3',
      clientID: 'ffQadIhSGruY81TYO9Zb0POFBLzTQ7beBxf64JofgXxxe4aSfI / BAazOOc0PTf6tFvsezu79fTft2aMF5qMwBh17nAZyWLUjb9GN3',
      email: 'leandro.gabrielcunha@gmail.com',
      installments: 0,
      items: [
        {
          name: 'Geral',
          quantity: 1,
          sku: '10',
          unitOfMeasure: 'unidade',
          unitPrice: 10,
        },
      ],
      paymentCode: 'DEBITO_AVISTA',
      value: '10',
    };

    const response = await NativeModules.Payment.payment(JSON.stringify(json));

    return {
      success: response.success,
      code: response.code,
      result: response.success ? JSON.parse(response.result) : response.result,
    };
  }
}

export {Cielo};

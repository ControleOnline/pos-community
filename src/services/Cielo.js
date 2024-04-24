import { NativeModules } from 'react-native';
import {ACCESS_TOKEN, CLIENT_ID, EMAIL} from "@env";

class Cielo {
  async payment(paymentCode, items, orderPrice) {
    const json = {    
      accessToken: ACCESS_TOKEN,
      clientID: CLIENT_ID,
      email: EMAIL,
      installments: 0,
      items: items,
      paymentCode: paymentCode,
      value: orderPrice,
    };

    const response = await NativeModules.Payment.payment(JSON.stringify(json));

    return {
      success: response.success,
      code: response.code,
      result: response.success ? JSON.parse(response.result) : response.result,
    };
  }
}

export default Cielo;

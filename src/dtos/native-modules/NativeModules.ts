import type {IPayment} from './PaymentModule';

interface NativeModules {
  Payment: IPayment;
}

export type {NativeModules};

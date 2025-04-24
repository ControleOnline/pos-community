import acl from '@controleonline/ui-common/src/store/acl';
import categories from '@controleonline/ui-common/src/store/categories';
import city from '@controleonline/ui-common/src/store/address/city';
import configs from '@controleonline/ui-common/src/store/configs';
import file from '@controleonline/ui-common/src/store/file';
import status from '@controleonline/ui-common/src/store/status';
import device from '@controleonline/ui-common/src/store/device';
import device_config from '@controleonline/ui-common/src/store/device_config';
import print from '@controleonline/ui-common/src/store/print';
import printer from '@controleonline/ui-common/src/store/printer';
import translate from '@controleonline/ui-translate/src/store/translate';
import auth from '@controleonline/ui-login/src/store/modules/auth';
import cart from '@controleonline/ui-orders/src/store/cart';
import orders from '@controleonline/ui-orders/src/store/orders';
import order_products from '@controleonline/ui-orders/src/store/order_products';
import expanded_order_products from '@controleonline/ui-orders/src/store/expanded_order_products';
import products from '@controleonline/ui-products/src/store/products';
import product_unit from '@controleonline/ui-products/src/store/products/product_unit';
import product_category from '@controleonline/ui-products/src/store/products/product_category';
import product_group from '@controleonline/ui-products/src/store/products/product_group';
import product_group_product from '@controleonline/ui-products/src/store/products/product_group_product';
import product_group_feedstock from '@controleonline/ui-products/src/store/products/product_group_feedstock';
import theme from '@controleonline/ui-layout/src/store/theme';
import address from '@controleonline/ui-people/src/store/address';
import documents from '@controleonline/ui-people/src/store/documents';
import phones from '@controleonline/ui-people/src/store/phones';
import emails from '@controleonline/ui-people/src/store/emails';
import people from '@controleonline/ui-people/src/store/people';
import invoice from '@controleonline/ui-financial/src/store/invoice';
import paymentType from '@controleonline/ui-financial/src/store/paymentType';
import wallet from '@controleonline/ui-financial/src/store/wallet';
import walletPaymentType from '@controleonline/ui-financial/src/store/walletPaymentType';

export default {
  acl,
  auth,
  cart,
  categories,
  city,
  configs,
  file,
  device,
  device_config,
  orders,
  order_products,
  expanded_order_products,
  products,
  product_unit,
  product_category,
  product_group,
  product_group_product,
  product_group_feedstock,
  status,
  translate,
  theme,
  print,
  printer,
  address,
  documents,
  phones,
  emails,
  people,
  invoice,
  paymentType,
  wallet,
  walletPaymentType,
};

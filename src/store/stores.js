import acl from '@controleonline/ui-common/src/store/acl';
import categories from '@controleonline/ui-common/src/store/categories';
import city from '@controleonline/ui-common/src/store/address/city';
import file from '@controleonline/ui-common/src/store/file';
import status from '@controleonline/ui-common/src/store/status';
import tt from '@controleonline/ui-common/src/store/tt';
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

export default {
  acl,
  auth,
  cart,
  categories,
  city,
  file,
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
  tt,
  theme,
  address,
  documents,
  phones,
  emails,
  people,
};

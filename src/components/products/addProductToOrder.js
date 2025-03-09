import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, Modal, FlatList, TouchableOpacity } from 'react-native';

const ProductScreen = ({ products, onAddToCart }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedItems, setSelectedItems] = useState({});

  const handleAddCustomProduct = (product) => {
    setSelectedProduct(product);
    setShowDialog(true);
  };

  const handleIncreaseQuantity = (product, index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = (updatedProducts[index].quantity || 0) + 1;
    onAddToCart(updatedProducts[index]);
  };

  const handleDecreaseQuantity = (product, index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity && updatedProducts[index].quantity > 0) {
      updatedProducts[index].quantity--;
    }
    onAddToCart(updatedProducts[index]);
  };

  const handleSelectItem = (groupId, item) => {
    const newSelectedItems = { ...selectedItems };
    if (!newSelectedItems[groupId]) {
      newSelectedItems[groupId] = [];
    }
    if (newSelectedItems[groupId].includes(item)) {
      newSelectedItems[groupId] = newSelectedItems[groupId].filter((i) => i !== item);
    } else {
      newSelectedItems[groupId].push(item);
    }
    setSelectedItems(newSelectedItems);
  };

  const handleSaveCustomToCart = () => {
    // Simulate saving the custom product to the cart
    console.log('Saving to cart:', selectedItems);
    setShowDialog(false);
  };

  const renderProductItem = ({ item, index }) => (
    <View key={item.id} style={{ marginBottom: 20, borderWidth: 1, padding: 10 }}>
      <Text>{item.product}</Text>
      <Text>{item.description}</Text>
      <Text>Preço: R$ {item.price}</Text>
      <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100 }} />
      {item.type === 'custom' ? (
        <Button title="Adicionar Produto Personalizado" onPress={() => handleAddCustomProduct(item)} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Button title="-" onPress={() => handleDecreaseQuantity(item, index)} />
          <Text style={{ marginHorizontal: 10 }}>{item.quantity || 0}</Text>
          <Button title="+" onPress={() => handleIncreaseQuantity(item, index)} />
        </View>
      )}
    </View>
  );

  const renderGroupOptions = (groupId) => (
    <FlatList
      data={selectedItems[groupId] || []}
      renderItem={({ item }) => (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
          <Text>{item.label}</Text>
          <TouchableOpacity onPress={() => handleSelectItem(groupId, item)}>
            <Text style={{ color: 'blue' }}>{selectedItems[groupId]?.includes(item) ? 'Remover' : 'Adicionar'}</Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item) => item.id}
    />
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
      />

      <Modal visible={showDialog} onRequestClose={() => setShowDialog(false)}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <Text style={{ fontSize: 18 }}>Seleção de Produto: {selectedProduct?.product}</Text>
          <Text>Total: R$ {selectedProduct?.price}</Text>

          {/* Exibir opções do grupo */}
          {selectedProduct?.groups?.map((group) => (
            <View key={group.id}>
              <Text>{group.productGroup}</Text>
              {renderGroupOptions(group.id)}
            </View>
          ))}

          <Button title="Fechar" onPress={() => setShowDialog(false)} />
          <Button title="Adicionar ao Carrinho" onPress={handleSaveCustomToCart} />
        </View>
      </Modal>
    </View>
  );
};

export default ProductScreen;

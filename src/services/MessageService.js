import React, {createContext, useContext, useState} from 'react';
import {Portal, Snackbar, Dialog, Paragraph, Button} from 'react-native-paper';
import {View} from 'react-native';

const MessageContext = createContext();

export const useMessage = () => useContext(MessageContext);

export const MessageProvider = ({children}) => {
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    duration: 4000,
    position: 'center', // top, center, bottom
  });

  const [dialog, setDialog] = useState({
    visible: false,
    title: '',
    message: '',
    onConfirm: null,
    onCancel: null,
  });

  const showToast = (message, options = {}) => {
    const {duration = 4000, position = 'center'} = options;
    setSnackbar({visible: true, message, duration, position});
  };

  const showDialog = ({title, message, onConfirm, onCancel}) => {
    setDialog({
      visible: true,
      title,
      message,
      onConfirm,
      onCancel,
    });
  };

  const hideToast = () => setSnackbar(s => ({...s, visible: false}));
  const hideDialog = () => setDialog(d => ({...d, visible: false}));

  return (
    <MessageContext.Provider value={{showToast, showDialog}}>
      {children}

      <Portal>
        <View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            top:
              snackbar.position === 'top'
                ? 50
                : snackbar.position === 'center'
                ? '45%'
                : undefined,
            bottom: snackbar.position === 'bottom' ? 30 : undefined,
            left: 20,
            right: 20,
            alignItems: 'center',
          }}>
          <Snackbar
            visible={snackbar.visible}
            duration={snackbar.duration}
            onDismiss={hideToast}
            action={{
              label: 'Fechar',
              onPress: hideToast,
            }}
            style={{width: '100%'}}>
            {snackbar.message}
          </Snackbar>
        </View>

        <Dialog visible={dialog.visible} onDismiss={hideDialog}>
          <Dialog.Title>{dialog.title}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{dialog.message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                hideDialog();
                dialog.onCancel?.();
              }}>
              Cancelar
            </Button>
            <Button
              onPress={() => {
                hideDialog();
                dialog.onConfirm?.();
              }}>
              Confirmar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </MessageContext.Provider>
  );
};


export const fetchOrdersForQueue = async (queueId) => {
    try {
        const response = await api.fetch(`/display_queues/${queueId}`);
        return response.data
    } catch (error) {
        console.error('Erro ao buscar pedidos para a fila:', error);
        throw error;
    }
};

export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await api.put(`/orders/${orderId}`, { status });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar status do pedido:', error);
        throw error;
    }
};
export const fetchDisplayType = async (displayId) => {
    try {
        const response = await api.fetch(`/displays/${displayId}`);
        return response.data.displayType;
    } catch (error) {
        console.error('Erro ao buscar tipo de display:', error);
        throw error;
    }
};
export const fetchQueuesForDisplay = async (displayId) => {
    try {
        const response = await api.fetch(`/display_queues`, {
            params: { display: `/displays/${displayId}` }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar filas para o display:', error);
        throw error;
    }
};
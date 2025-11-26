import api from './api';

// Função genérica para buscar um recurso (GET)
export const fetchResource = async <T>(resource: string, id?: number): Promise<T | null> => {
  try {
    // Se passar um ID, adiciona ao endpoint
    const url = id ? `/${resource}/${id}` : `/${resource}`;
    const response = await api.get<T>(url);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar recurso:', error);
    return null;
  }
};

// Função para criar recurso (POST)
export const createResource = async <T>(resource: string, data: T) => {
  const response = await api.post<T>(`/${resource}`, data);
  return response;
};

// Função para atualizar parte de um recurso (patch)
export const updatePartialResource = async <T>(
  resource: string,
  id: number,
  data: Partial<T>
) => {
  const response = await api.patch<T>(`/${resource}/${id}`, data);
  return response;
};

// Função para atualizar um recurso (put)
export const updateResource = async <T>(
  resource: string,
  id: number,
  data: T
) => {
  const response = await api.put<T>(`/${resource}/${id}`, data);
  return response;
};

// Função para deletar recurso (DELETE)
export const deleteResource = async (resource: string, id: number) => {
  await api.delete(`/${resource}/${id}`);
};
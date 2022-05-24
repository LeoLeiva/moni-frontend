const API_URL = "http://127.0.0.1:8000/api/client1/";

export const listClients = async () => {
    return await fetch(API_URL);
};

export const getClient = async (clientId) => {
    return await fetch(`${API_URL}${clientId}`);
};

export const registerClient = async (newClient) => {
    return await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "first_name": String(newClient.first_name).trim(),
            "last_name": String(newClient.last_name).trim(),
            "gender": parseInt(newClient.gender),
            "email": String(newClient.email).trim(),
            "document_number": parseInt(newClient.document_number),
        })
    });
};

export const updateClient = async (clientId, updatedClient) => {
    return await fetch(`${API_URL}${clientId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "first_name": String(updatedClient.first_name).trim(),
            "last_name": String(updatedClient.last_name).trim(),
            "gender": parseInt(updatedClient.gender),
            "email": String(updatedClient.email).trim(),
            "document_number": parseInt(updatedClient.document_number),
        })
    });
};

export const deleteClient = async (clientId) => {
    return await fetch(`${API_URL}${clientId}`, {
        method: 'DELETE'
    });
};

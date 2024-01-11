// FilesService.js
import axios from "axios";

const FilesService = {
    uploadFile: async (file, token) => {
        try {
            console.log('User Token:', token);
            const formData = new FormData();
            formData.append("file", file);

            const response = await axios.post("http://localhost:8082/api/files", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": token, // Dodaj nagłówek Authorization z tokenem
                },
            });

            return response.data;
        } catch (error) {
            console.error("Błąd podczas przesyłania pliku:", error);
            throw error;
        }
    },

    getFileList: async () => {
        try {
            const response = await axios.get("http://localhost:8082/api/files");
            return response.data;
        } catch (error) {
            console.error("Błąd podczas pobierania listy plików:", error);
            throw error;
        }
    },
};

export default FilesService;

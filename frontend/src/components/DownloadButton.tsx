import axios from "axios";

   export const handleDownload = async (filePath: string, fileName: string ) => {
    
        try {
            const response = await axios.get(filePath, {
                responseType: "blob", 
            });

            const blob = new Blob([response.data],  { type: "audio/mpeg" });
            const downloadUrl = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = downloadUrl;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
            
            window.URL.revokeObjectURL(downloadUrl);

        } catch (error) {
            console.error("Error downloading the file:", error);
            alert("Failed to download the file. Please try again.");
        }
    };

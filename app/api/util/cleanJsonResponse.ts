export const cleanJsonResponse = (jsonResponse: string) => {
    const cleanResponse = jsonResponse
                            .replace(/```json/g, '')
                            .replace(/```/g, '')
                            .trim();
    return cleanResponse;
} 
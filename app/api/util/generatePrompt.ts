export const generatePrompt = (form: string) => {
    const prompt = `
        You are a professional form generator.
        Analyze the provided form requirements carefully and create a form JSON structure matching the exact following specification:
        Expected JSON Output Structure:
        {
        "title": "string",             // A short, clear title for the form
        "description": "string",       // A helpful description explaining the purpose of the form
        "fields": [                    // List of form fields
                {
                "fieldId": "string",        // Unique field ID (camelCase format recommended)
                "label": "string",          // Label to display above the input
                    "type": "one of: 'text' | 'textarea' | 'checkbox' | 'radio' | 'dropdown' | 'email' | 'select'", 
                "required": true | false,   // Whether filling this field is mandatory
                "placeholder": "optional string",  // (Only for 'text', 'textarea', 'email') - Placeholder inside the field
                "options": ["array of string options (only for checkbox, radio, dropdown, select)"] // Optional choices
                }
            ]
        }

        Strict Requirements:
        - Do not return anything except the JSON object.
        - Ensure the type matches exactly one of: text, textarea, checkbox, radio, dropdown, email, select.
        - Only include the options array for fields where it is applicable (checkbox, radio, dropdown, select).
        - Use clear and appropriate fieldId names (e.g., "firstName", "userFeedback", "preferredContactMethod").
        - Add useful placeholders for input types (text, textarea, email) whenever possible.
        - Assume all fields are required unless otherwise specified.

        Input Form Requirements: ${form}
        Output must be a single valid JSON object matching the structure above. No text, no markdown, no explanations.
    `
    return prompt
} 
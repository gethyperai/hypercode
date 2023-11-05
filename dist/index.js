import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
class Hypercode {
    constructor(apiKey) {
        this.apiUrl = "https://api.gethyper.ai/v1/types";
        this.apiKey = apiKey;
    }
    init(apiKey) {
        this.apiKey = apiKey;
    }
    async makeRequest(endpoint, queryOrContent, contextId) {
        const url = `${this.apiUrl}/${endpoint}`;
        const payload = contextId
            ? { query: queryOrContent, context_id: contextId }
            : { content: queryOrContent };
        try {
            const response = await axios.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        }
        catch (error) {
            console.error("Error making request:", error);
            throw error;
        }
    }
    async boolean(query, contextId) {
        return await this.makeRequest("boolean", query, contextId);
    }
    async integer(query, contextId) {
        return await this.makeRequest("integer", query, contextId);
    }
    async string(query, contextId) {
        return await this.makeRequest("string", query, contextId);
    }
    async datetime(query, contextId) {
        return await this.makeRequest("datetime", query, contextId);
    }
    async float(query, contextId) {
        return await this.makeRequest("float", query, contextId);
    }
}
// Create an instance of Hypercode with the API key
const hyper = new Hypercode(process.env.HYPER_API_KEY || "");
export default hyper;

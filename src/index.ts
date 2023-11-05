import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

class Hypercode {
  private apiKey: string;
  private apiUrl: string = "https://api.gethyper.ai/v1/types";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  init(apiKey: string): void {
    this.apiKey = apiKey;
  }

  private async makeRequest(
    endpoint: string,
    queryOrContent: string,
    contextId?: string
  ): Promise<any> {
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
    } catch (error) {
      console.error("Error making request:", error);
      throw error;
    }
  }

  async boolean(query: string, contextId?: string): Promise<{ data: boolean }> {
    return await this.makeRequest("boolean", query, contextId);
  }

  async integer(query: string, contextId?: string): Promise<{ data: number }> {
    return await this.makeRequest("integer", query, contextId);
  }

  async string(query: string, contextId?: string): Promise<{ data: string }> {
    return await this.makeRequest("string", query, contextId);
  }

  async datetime(query: string, contextId?: string): Promise<{ data: string }> {
    return await this.makeRequest("datetime", query, contextId);
  }

  async float(query: string, contextId?: string): Promise<{ data: number }> {
    return await this.makeRequest("float", query, contextId);
  }
}

// Create an instance of Hypercode with the API key
const hyper = new Hypercode(process.env.HYPER_API_KEY || "");
export default hyper;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Hypercode {
    constructor(apiKey) {
        this.apiUrl = "https://api.gethyper.ai/v1/types";
        this.apiKey = apiKey;
    }
    async init(apiKey) {
        this.apiKey = apiKey;
    }
    async makeRequest(endpoint, queryOrContent, contextId) {
        const url = `${this.apiUrl}/${endpoint}`;
        const payload = contextId
            ? { query: queryOrContent, context_id: contextId }
            : { content: queryOrContent };
        try {
            const response = await axios_1.default.post(url, payload, {
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
const hyper = new Hypercode(process.env.HYPER_API_KEY || "");
exports.default = hyper;

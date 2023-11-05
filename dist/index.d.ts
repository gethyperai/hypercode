declare class Hypercode {
    private apiKey;
    private apiUrl;
    constructor(apiKey: string);
    init(apiKey: string): void;
    private makeRequest;
    boolean(query: string, contextId?: string): Promise<{
        data: boolean;
    }>;
    integer(query: string, contextId?: string): Promise<{
        data: number;
    }>;
    string(query: string, contextId?: string): Promise<{
        data: string;
    }>;
    datetime(query: string, contextId?: string): Promise<{
        data: string;
    }>;
    float(query: string, contextId?: string): Promise<{
        data: number;
    }>;
}
declare const hyper: Hypercode;
export default hyper;

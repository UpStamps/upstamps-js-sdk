interface Params {
    clientId: string;
    projectKey: string;
    envKey: string;
    endpoint?: string;
}
declare class UpStamps {
    readonly clientId: string;
    readonly projectKey: string;
    readonly envKey: string;
    readonly endpoint: string;
    constructor({ clientId, projectKey, envKey, endpoint }: Params);
    scopes(params: {
        name?: string;
        email: string;
    }): Promise<{
        error: boolean;
        message: string;
        success?: undefined;
    } | {
        error: boolean;
        success: boolean;
        message: string;
    }>;
    flag(name: string): Promise<{
        show: boolean;
    }>;
    remote(name: string): Promise<{
        show: boolean;
        data: any;
    } | {
        show: boolean;
        data?: undefined;
    }>;
    test(name: string): Promise<{
        show: boolean;
        variant: string;
        emitter: () => Promise<any>;
    }>;
    segment(name: string, params: {
        country?: string;
        client?: string;
        clientType?: string;
    }): Promise<{
        show: boolean;
    }>;
}
export default UpStamps;

interface Params {
    clientId: string;
    projectKey: string;
    envKey: string;
}
declare class UpStamps {
    clientId: string;
    projectKey: string;
    envKey: string;
    constructor({ clientId, projectKey, envKey }: Params);
    flags(name: string): Promise<boolean>;
    remote(name: string): Promise<{
        show: boolean;
        data: any;
    } | {
        show: boolean;
        data?: undefined;
    }>;
}
export default UpStamps;
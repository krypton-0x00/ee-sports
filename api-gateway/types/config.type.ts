export namespace Config {

    interface ServiceType {
        path:string;
        target_service: string;
        target_port : string;
    }
    export interface ConfigType {
        authorization_api_url: string;
        services: ServiceType[];
    }
    
}

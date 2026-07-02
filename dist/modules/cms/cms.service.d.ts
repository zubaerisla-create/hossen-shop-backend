export declare class CmsService {
    /**
     * Retrieve a CMS setting by its key
     */
    static getSetting(key: string): Promise<any>;
    /**
     * Update/Upsert a CMS setting by key
     */
    static updateSetting(key: string, value: any): Promise<import("@prisma/client/runtime/client").JsonValue>;
}
export default CmsService;

export declare class FeaturesService {
    /**
     * Fetch all features
     */
    static getAllFeatures(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        iconName: string;
    }[]>;
    /**
     * Fetch a single feature by ID
     */
    static getFeatureById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        iconName: string;
    }>;
    /**
     * Create a feature
     */
    static createFeature(data: {
        title: string;
        subtitle: string;
        iconName: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        iconName: string;
    }>;
    /**
     * Update an existing feature
     */
    static updateFeature(id: string, data: {
        title?: string;
        subtitle?: string;
        iconName?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        iconName: string;
    }>;
    /**
     * Delete a feature
     */
    static deleteFeature(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        subtitle: string;
        iconName: string;
    }>;
}
export default FeaturesService;

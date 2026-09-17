export type Plan = {
    id: string;
    name: string;
    description: string;
    price: number;
    interval: string;
    features: string[];
    highlighted: boolean;
};

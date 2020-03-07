import { SpiceType } from './spice-type';

export interface Spice {
    _id?: string;
    label: string;
    type: SpiceType;
    selected?: boolean;
    image?: string;
    printed?: string;
    expirationDate?: string;
    spicyLevel?: number;
}

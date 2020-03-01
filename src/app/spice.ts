import { SpiceType } from './spice-type';

export interface Spice {
    _id?: string;
    label: string;
    type: SpiceType;
    selected?: boolean;
    image?: string;
    printed?: boolean;
    expirationDate?: string;
    spicyLevel?: number;
}

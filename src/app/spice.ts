import { SpiceType } from './spice-type';

export interface Spice {
    label: string;
    type: SpiceType;
    selected?: boolean;
    image?: string;
    printed?: boolean;
}

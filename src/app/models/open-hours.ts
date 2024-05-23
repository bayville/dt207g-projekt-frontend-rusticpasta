import { Time } from "@angular/common";

export interface OpenHours {
    id?: number;
    day: string;
    openTime: string | null;
    closeTime: string | null;
}

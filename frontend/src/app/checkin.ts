import { DeclarationListEmitMode } from "@angular/compiler";
import { User } from "./user";

export interface Checkin {
    user: User;
    created_at: string
}
import { ContactTypes } from "@/enums/ContactTypes";

export interface Friend {
  id: number;
  firstName: string;
  lastName: string;
  lastContactDate: Date | string;
  lastContactType: ContactTypes;
  desiredContactFrequency: number;
  categoryName?: string;
  categoryId?: number;
}

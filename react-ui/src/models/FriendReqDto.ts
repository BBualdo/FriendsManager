export interface FriendReqDto {
  firstName: string;
  lastName: string;
  lastContactDate: Date | string;
  lastContactType: number;
  desiredContactFrequency: number;
  categoryId?: number;
}

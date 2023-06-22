export interface Client {
  id?: number;
  name: string;
  lastName: string;
  phone: string;
  totalRides: number;
  totalFinished: number;
  homeLocation: string;
  workLocation: string;
  fileUrl: string;
}

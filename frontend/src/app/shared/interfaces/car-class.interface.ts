export interface CarClass {
  name: string;
  lightning: boolean;
  delivery: boolean;
  startingValue: number;
  freeKm: number;
  perKmValue: number;
  perMinuteValue: number;
  waitingTime: number;
  outOfBranch: number;
  id?: number;
}

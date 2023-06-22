export interface Ride {
  id: string;
  userName: string;
  userPhone: string;
  carComfort: string;
  orderedTime: string;
  startLocation: string;
  finishLocation: string;
  income: string;
  reason: string;
  status:
    | 'Pending'
    | 'In Progress'
    | 'Completed'
    | 'Upcoming'
    | 'Pre cancelled'
    | 'Cancelled by driver'
    | 'Done';
}

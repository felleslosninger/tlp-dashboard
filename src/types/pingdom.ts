export interface PingdomSummaryAverage {
  responsetime: Responsetime;
  status: Status;
}
export interface Responsetime {
  avgresponse: number;
  from: number;
  to: number;
}
export interface Status {
  totaldown: number;
  totalunknown: number;
  totalup: number;
}

import { Moment } from "moment";

export type Order = {
  id: number;
  client: string;
  amount: number;
  createdAt: Moment;
  delivered: boolean;
};

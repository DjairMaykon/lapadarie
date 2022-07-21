import moment from "moment";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IconPen } from "../../../assets/IconPen";
import { IconTimer } from "../../../assets/IconTimer";
import { IconTrash } from "../../../assets/IconTrash";
import { Order } from "../../../utils/types";
import "./style.css";

type QueueItemProps = {
  order: Order;
  breadPrice: number;
  onDelete: (order: Order) => void;
  onEdit: (order: Order) => void;
  onDelivery: (order: Order, delivered: boolean) => void;
};
export function QueueItem({
  order,
  breadPrice,
  onEdit,
  onDelete,
  onDelivery,
}: QueueItemProps) {
  const [time, setTime] = useState<number | undefined>();
  useEffect(() => {
    if (moment().diff(moment(order.createdAt), "hours") < 1) {
      const interval = setInterval(() => {
        setTime(moment().diff(moment(order.createdAt)));
        if (time && Math.trunc(time / 1000) == 60)
          toast(`${order.client} esperando a um 1 minuto!`);
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  const TimerCount = () => (
    <>
      {time && Math.trunc(time / 1000) > 60 && <IconTimer />}
      {time && moment(time).format("mm:ss")}
    </>
  );

  return (
    <div className="item">
      <Toaster />
      <main>
        <header>
          <label className="checkbox-icon">
            <input
              type="checkbox"
              checked={order.delivered}
              onChange={(e) => onDelivery(order, e.currentTarget.checked)}
            />
            <span className="geekmark"></span>
          </label>
          <h1 className="item-title">{order.client}</h1>
          {!order.delivered && moment().diff(order.createdAt, "hours") < 1
            ? TimerCount()
            : moment(order.createdAt).format("DD/MM/YY HH:mm")}
        </header>
        <div className="item-content">
          <h2>
            <strong>Total de pães:</strong> {order.amount} pães
          </h2>
          <h2>
            <strong>Total a pagar:</strong> R${" "}
            {(order.amount * breadPrice).toFixed(2)}
          </h2>
        </div>
      </main>
      <div className="icons">
        <a className="edit-icon" onClick={() => onEdit(order)}>
          <IconPen />
        </a>
        <a className="delete-icon" onClick={() => onDelete(order)}>
          <IconTrash />
        </a>
      </div>
    </div>
  );
}

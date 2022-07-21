import { useEffect, useState } from "react";
import api from "../service/api";
import { Order } from "../utils/types";

export function useOrder(): [
  orders: Order[],
  addOrder: (client: string, amount: number) => Promise<void>,
  editOrder: (order: Order, client: string, amount: number) => Promise<void>,
  deleteOrder: (order: Order) => Promise<void>,
  deliveryOrder: (order: Order, delivered: boolean) => Promise<void>,
  breadPrice: number,
  orderQuantity: () => number,
  deliveredOrders: () => Order[],
  pendingOrders: () => Order[]
] {
  const [orders, setOrders] = useState<Order[]>([]);
  const [breadPrice, setBreadPrice] = useState<number>(0.5);
  const deliveredOrders = () => orders.filter((o) => o.delivered);
  const pendingOrders = () => orders.filter((o) => !o.delivered);
  const ordersAmount = () =>
    orders.reduce((sum, order) => sum + order.amount, 0);

  useEffect(() => {
    getOrders();
  }, []);

  function getOrders() {
    api
      .get<Order[]>("/order")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        throw err;
      });
  }

  function addOrder(client: string, amount: number) {
    return new Promise<void>((resolve, reject) => {
      api
        .post<Order>("/order", {
          client,
          amount,
        })
        .then((response) => {
          getOrders();
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  function editOrder(order: Order, client?: string, amount?: number) {
    return new Promise<void>((resolve, reject) => {
      api
        .patch<Order>(`/order/${order.id}`, {
          client,
          amount,
        })
        .then((response) => {
          getOrders();
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  function deleteOrder(order: Order) {
    return new Promise<void>((resolve, reject) => {
      api
        .delete<Order>(`/order/${order.id}`)
        .then((response) => {
          getOrders();
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  function deliveryOrder(order: Order, delivered: boolean) {
    return new Promise<void>((resolve, reject) => {
      api
        .patch<Order>(`/order/${order.id}`, {
          delivered,
        })
        .then((response) => {
          getOrders();
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  return [
    orders,
    addOrder,
    editOrder,
    deleteOrder,
    deliveryOrder,
    breadPrice,
    ordersAmount,
    deliveredOrders,
    pendingOrders,
  ];
}

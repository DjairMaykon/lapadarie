import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { Order } from "../../utils/types";
import "./style.css";

ReactModal.setAppElement("#root");

type ModalProps = {
  modalIsOpen: boolean;
  order?: Order;
  onCancel: () => void;
  onSend: (client: string, amount: number) => void;
};
export function Modal({ order, modalIsOpen, onCancel, onSend }: ModalProps) {
  const [client, setClient] = useState<string | null>(
    order ? order.client : null
  );
  const [clientInvalid, setCLientInvalid] = useState<boolean>(false);
  const [amount, setAmount] = useState<number | null>(
    order ? order.amount : null
  );
  const [amountInvalid, setAmountInvalid] = useState<boolean>(false);

  function handleSend() {
    setCLientInvalid(false);
    setAmountInvalid(false);
    if (!client || client.length <= 1) {
      setCLientInvalid(true);
    }
    if (!amount || amount <= 0) {
      setAmountInvalid(true);
    }
    if (client && amount && amount > 0) {
      onSend(client, amount);
      setClient(null);
      setAmount(null);
    }
  }

  function handleCancel() {
    setCLientInvalid(false);
    setClient(null);
    setAmountInvalid(false);
    setAmount(null);
    onCancel();
  }

  useEffect(() => {
    if (order) {
      setClient(order.client);
      setAmount(order.amount);
    }
  }, [order]);
  return (
    <ReactModal
      style={{
        overlay: {
          background: "rgba(229, 207, 148, 0.5)",
        },
      }}
      isOpen={modalIsOpen}
      className="modal"
    >
      <h1 className="modal-title">Adicionar pessoa a fila</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <input
            className={clientInvalid ? "invalid" : ""}
            type="text"
            value={client ?? ""}
            onChange={(e) => {
              setClient(e.target.value);
            }}
            placeholder="Nome completo do cliente"
          />
          {clientInvalid && <p>Nome inválido</p>}
        </div>
        <div>
          <input
            className={amountInvalid ? "invalid" : ""}
            type="number"
            value={amount ?? 0}
            onChange={(e) => {
              setAmount(parseInt(e.target.value));
            }}
            placeholder="Total de pães:"
          />
          {amountInvalid && <p>Total inválido</p>}
        </div>
        <div className="modal-buttons">
          <button className="modal-button-send" onClick={handleSend}>
            Enviar
          </button>
          <button className="modal-button-cancel" onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </ReactModal>
  );
}

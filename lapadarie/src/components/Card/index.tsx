import { ReactElement } from "react";
import "./style.css";

type CardProps = {
  id: string;
  title: string;
  icon: ReactElement;
  value: string;
  bgColor?: string;
  textColor?: string;
};
export function Card({
  id,
  title,
  icon,
  value,
  bgColor,
  textColor,
}: CardProps) {
  return (
    <div
      id={id}
      style={{
        backgroundColor: bgColor ?? "#ffffff",
        color: textColor ?? "#000000",
      }}
      className="card"
    >
      <header>
        <h1 className="card-title">{title}</h1>
        {icon}
      </header>
      <h1 className="card-content">{value}</h1>
    </div>
  );
}

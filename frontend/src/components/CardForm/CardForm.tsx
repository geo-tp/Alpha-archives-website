import { ReactNode } from "react";

type CardFormProps = {
  title: string;
  icon: string;
  children: ReactNode;
};

export const CardForm = (props: CardFormProps) => {
  return (
    <div className="card-form">
      <h2>
        {props.title}
        <i className={`fa fa-${props.icon}`}></i>
      </h2>
      {props.children}
    </div>
  );
};

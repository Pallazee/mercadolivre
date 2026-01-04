import { useState } from "react";

export default function Shipping() {
  const [cep, setCep] = useState("");

  return (
    <div className="shipping">
      <span className="shipping-title">Frete</span>

      <div className="shipping-cep">
        <input
          type="text"
          placeholder="Informe seu CEP"
          value={cep}
          maxLength={9}
          onChange={(e) => setCep(e.target.value)}
        />
        <button>Calcular</button>
      </div>

      <div className="shipping-info">
        <span className="free">Frete grátis</span>
        <span className="details">Chegará entre 2 e 4 dias úteis</span>
      </div>
    </div>
  );
}

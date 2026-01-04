export default function BuyBox({ price, installments }) {
  return (
    <aside className="buy-box">
      <div className="price">
        R$ {price.toFixed(2).replace(".", ",")}
      </div>

      <div className="installments">
        {installments}
      </div>

      <button className="buy-btn">
        Comprar agora
      </button>

      <button className="cart-btn">
        Adicionar ao carrinho
      </button>
    </aside>
  );
}

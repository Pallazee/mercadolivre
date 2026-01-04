export default function ProductInfo({ product }) {
  return (
    <div className="product-info">
      <h1>{product.title}</h1>

      <div className="rating">
        ⭐ {product.rating} ({product.reviews} avaliações)
      </div>
    </div>
  );
}

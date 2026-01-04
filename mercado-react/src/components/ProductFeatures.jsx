export default function ProductFeatures({ features }) {
  return (
    <div className="product-features">
      <h2>Características do produto</h2>

      <div className="features-grid">
        {features.map((item, index) => (
          <div key={index} className="feature-item">
            <span className="feature-label">{item.label}</span>
            <span className="feature-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

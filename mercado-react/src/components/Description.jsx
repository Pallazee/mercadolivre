export default function Description({ text }) {
  if (!text) return null;

  return (
    <section className="ml-description">
      <h2>Descrição</h2>

      <div className="ml-description-box">
        <h3>Descrição do produto</h3>
        <p>{text}</p>
      </div>
    </section>
  );
}

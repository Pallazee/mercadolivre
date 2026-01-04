export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb">
      {items.map((item, index) => (
        <span key={index}>
          <a href="#">{item}</a>
          {index < items.length - 1 && <span className="separator"> &gt; </span>}
        </span>
      ))}
    </nav>
  );
}

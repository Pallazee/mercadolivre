import "../styles/product.css";
import { product } from "../data/product";

import Gallery from "../components/Gallery";
import ProductInfo from "../components/ProductInfo";
import BuyBox from "../components/BuyBox";
import Shipping from "../components/Shipping";
import Description from "../components/Description";
import Breadcrumb from "../components/Breadcrumb";
import ProductFeatures from "../components/ProductFeatures";


export default function Product() {
  return (
    <>
      <Breadcrumb items={product.breadcrumb} />

      <div className="product-container">
        <div className="product-grid">
          <Gallery images={product.images} />

          {/* COLUNA DIREITA */}
          <div className="right-column">
            <div className="buybox-wrapper">
              <ProductInfo product={product} />
              <BuyBox
                price={product.price}
                installments={product.installments}
              />
              <Shipping />
            </div>
          </div>
        </div>
<ProductFeatures features={product.features} />

        <Description text={product.description} />
      </div>
    </>
  );
}

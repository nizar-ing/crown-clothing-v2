import { useContext, Fragment } from "react";

import CategoryPreview from "../../components/category-preview/category-preview.component";

import { CategoriesContext } from "../../contexts/categories.context";

//import './shop.styles.scss';

const CategoriesPreview = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <Fragment>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
    /* Object.keys(categoriesMap).map((title) => (
            <Fragment key={title}>
                <h2>{title}</h2>
                <div className='products-container'>
                    {categoriesMap[title].filter((product, index) => index < 4).map((product) => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </Fragment>
        ))*/
  );
};

export default CategoriesPreview;

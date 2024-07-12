import styled, { css } from "styled-components";
import StoreItem from "../markups/StoreItem";
import { useEffect, useState } from "react";
import { useGetProducts } from "../hooks/productHooks";
import { DisplayAltMessage, Spinner } from "../components/elementComponents";
import StoreCart from "../context/StoreCart";

const StyledMain = styled.main`
  width: 100%;
  padding-right: 3px;

  overflow: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 3rem;

  ${(p) =>
    p.$length < 4 &&
    css`
      grid-template-columns: repeat(auto-fit, minmax(30rem, 35rem));
    `}
`;
function Store() {
  const [meta, setMeta] = useState({});
  const [products, setProducts] = useState();
  const { data, isLoading } = useGetProducts();

  useEffect(() => {
    data && setMeta(data.meta);
    data && setProducts(data.data);
  }, [data]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && !meta.length && <DisplayAltMessage message="No products available" />}
      {meta.length > 0 && (
        <StyledMain $length={meta.length}>
          <StoreCart>
            {products.map((product) => (
              <StoreItem key={product.id} product={product} />
            ))}
          </StoreCart>
        </StyledMain>
      )}
    </>
  );
}

export default Store;

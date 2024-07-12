import styled from "styled-components";

import { DisplayAltMessage, Spinner } from "../components/elementComponents";
import Table from "../context/Table";
import ProductItem from "../markups/ProductItem";
import { useGetProducts } from "../hooks/productHooks";
import { useEffect, useState } from "react";
import AddProduct from "../components/AddProduct";
import DashboardHeading from "../layouts/DashboardHeading";

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;

  > :first-child {
    flex-grow: 1;
  }
`;

/*





*/

function Products() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({});
  const { data, isLoading } = useGetProducts();

  useEffect(() => {
    data && setProducts(data.data);
    data && setMeta(data.meta);
  }, [data]);

  return (
    <>
      <DashboardHeading />

      <StyledContent>
        <Table>
          <AddProduct />
          <Table.Window>
            <Table.Head
              labels={["image", "color", "name", "selling price", "profit", "in stock", "edit/request"]}
              gridColumn="1fr 0.5fr 3fr 1fr 1fr 1fr 1fr"
            />

            <Table.Body>
              {isLoading && <Spinner />}
              {!isLoading && !meta.length && <DisplayAltMessage message="No results found" />}
              {meta.length > 0 && products.map((p) => <ProductItem product={p} key={p.id} />)}
            </Table.Body>

            <Table.Footer total={meta.total} consumed={meta.consumed} prev={meta.previous} next={meta.available} page={meta.page} />
          </Table.Window>
        </Table>
      </StyledContent>
    </>
  );
}

export default Products;

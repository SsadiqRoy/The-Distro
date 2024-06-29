import styled from "styled-components";

import { Button } from "../components/elements";
import { FormGroup } from "../components/elementComponents";
import Table from "../context/Table";
import Modal from "../context/Modal";
import ProductItem from "../markups/ProductItem";

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;

  > :first-child {
    flex-grow: 1;
  }
`;

const AddProductButton = styled.div`
  text-align: right;
`;

const ModalContent = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  button {
    margin-top: 1rem;
  }
`;

/*





*/

function Products() {
  return (
    <StyledContent>
      <Table>
        <Table.Window>
          <Table.Head
            labels={["image", "color", "name", "selling price", "profit", "in stock", "edit/request"]}
            gridColumn="1fr 0.5fr 3fr 1fr 1fr 1fr 1fr"
          />

          <Table.Body>
            {Array.from({ length: 4 }).map((item, i) => (
              <ProductItem key={i} color={i + 1} />
            ))}
            {Array.from({ length: 4 }).map((item, i) => (
              <ProductItem key={i} color={i + 1} />
            ))}
            {Array.from({ length: 4 }).map((item, i) => (
              <ProductItem key={i} color={i + 1} />
            ))}
            {Array.from({ length: 4 }).map((item, i) => (
              <ProductItem key={i} color={i + 1} />
            ))}
          </Table.Body>

          <Table.Footer total={74} consumed={30} />
        </Table.Window>
      </Table>

      <AddProductButton>
        <Modal>
          <Modal.Open openId="add-product">
            <Button $shape="square">Add Product</Button>
          </Modal.Open>

          <Modal.Window id="add-product" title="add new product">
            <Modal.Content>
              <ModalContent>
                <FormGroup lable="Name" id="name" />
                <FormGroup lable="description" id="description" />
                <FormGroup lable="color" id="color" type="color" />
                <FormGroup lable="buying price" id="buying-price" type="number" />
                <FormGroup lable="selling price" id="selling-price" type="number" />
                <FormGroup lable="quantity" id="quantity" type="number" />
              </ModalContent>
            </Modal.Content>

            <Modal.Footer>
              <Button $size="large" $shape="square">
                Add Product
              </Button>
            </Modal.Footer>
          </Modal.Window>
        </Modal>
      </AddProductButton>
    </StyledContent>
  );
}

export default Products;

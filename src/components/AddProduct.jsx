import styled from "styled-components";
import Modal from "../context/Modal";
import { Button, FormGroup } from "./elementComponents";
import { useAddProduct } from "../hooks/productHooks";
import { useState } from "react";
import { forceCloseModal } from "../utilities/utilities";
import { PRICE_UNIT } from "../utilities/variables";

const AddProductButton = styled.div`
  text-align: right;
`;

function AddProduct() {
  const { addProduct, isAdding } = useAddProduct();

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [buyingPrice, setBuyinPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const modalId = "add-product";

  function handleSubmit(e) {
    if (e.type === "submit") e.preventDefault();

    const data = new FormData();
    data.append("name", name);
    data.append("image", image);
    data.append("description", description);
    data.append("color", color);
    data.append("buyingPrice", buyingPrice * PRICE_UNIT);
    data.append("sellingPrice", sellingPrice * PRICE_UNIT);
    data.append("quantity", quantity);

    addProduct(data, { onSuccess: () => forceCloseModal(modalId) });
  }

  function clearProductForm() {
    setName("");
    setImage(null);
    setDescription("");
    setColor("");
    setBuyinPrice("");
    setSellingPrice("");
    setQuantity("");
  }

  return (
    <AddProductButton>
      <Modal>
        <Modal.Open openId={modalId}>
          <Button $shape="square">Add Product</Button>
        </Modal.Open>

        <Modal.Window id={modalId} title="add new product" afterClose={clearProductForm}>
          <Modal.Content>
            <Modal.Form onSubmit={handleSubmit}>
              <FormGroup required disabled={isAdding} label="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              <FormGroup required disabled={isAdding} label="image" id="image" type="file" onChange={(e) => setImage(e.target.files[0])} />
              <FormGroup
                required
                disabled={isAdding}
                label="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormGroup
                required
                disabled={isAdding}
                label="color"
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <FormGroup
                step="0.01"
                required
                disabled={isAdding}
                label="buying price"
                id="buying-price"
                type="number"
                value={buyingPrice}
                onChange={(e) => setBuyinPrice(e.target.value)}
              />
              <FormGroup
                step="0.01"
                required
                disabled={isAdding}
                label="selling price"
                id="selling-price"
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              />
              <FormGroup
                required
                disabled={isAdding}
                label="quantity"
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button className="display-off">something</button>
            </Modal.Form>
          </Modal.Content>

          <Modal.Footer>
            <Button disabled={isAdding} onClick={handleSubmit} $size="large" $shape="square" data="add product" />
          </Modal.Footer>
        </Modal.Window>
      </Modal>
    </AddProductButton>
  );
}

export default AddProduct;

import styled from "styled-components";
import Modal from "../context/Modal";
import { Button, ButtonPrimary, FormGroup } from "./elementComponents";
import { useAddProduct } from "../hooks/productHooks";
import { useState } from "react";
import { forceCloseModal } from "../utilities/utilities";
import { PRICE_UNIT } from "../utilities/variables";

const AddProductButton = styled.div`
  text-align: right;
`;

function AddProduct() {
  const { createData, isCreating } = useAddProduct();

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

    createData(data, { onSuccess: () => forceCloseModal(modalId) });
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
          <Button $shape="square" data="add product" />
        </Modal.Open>

        <Modal.Window id={modalId} title="add new product" afterClose={clearProductForm}>
          <Modal.Content>
            <Modal.Form onSubmit={handleSubmit}>
              <FormGroup required disabled={isCreating} label="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
              <FormGroup required disabled={isCreating} label="image" id="image" type="file" onChange={(e) => setImage(e.target.files[0])} />
              <FormGroup
                required
                disabled={isCreating}
                label="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormGroup
                required
                disabled={isCreating}
                label="color"
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
              <FormGroup
                step="0.01"
                required
                disabled={isCreating}
                label="buying price"
                id="buying-price"
                type="number"
                value={buyingPrice}
                onChange={(e) => setBuyinPrice(e.target.value)}
              />
              <FormGroup
                step="0.01"
                required
                disabled={isCreating}
                label="selling price"
                id="selling-price"
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
              />
              <FormGroup
                required
                disabled={isCreating}
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
            <ButtonPrimary disabled={isCreating} onClick={handleSubmit} data="add product" />
          </Modal.Footer>
        </Modal.Window>
      </Modal>
    </AddProductButton>
  );
}

export default AddProduct;

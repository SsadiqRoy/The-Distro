import styled from "styled-components";
import { FiEdit, FiSend } from "react-icons/fi";

import Modal from "../context/Modal";
import { ColoredText } from "../components/elements";
import { ButtonPrimary, FormGroup } from "../components/elementComponents";
import { IMAGE_URL, PRICE_UNIT } from "../utilities/variables";
import { forceCloseModal, formatAmount } from "../utilities/utilities";
import { useUpdateProduct } from "../hooks/productHooks";
import { useState } from "react";
import { useRequestSupply } from "../hooks/supplyHooks";

const StyledProductItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--cl-border-opacity);

  display: grid;
  grid-template-columns: 1fr 0.5fr 3fr 1fr 1fr 1fr 1fr;
  column-gap: 1rem;
  align-items: center;
  justify-items: center;

  .image {
    width: 80%;
    height: 4rem;
    overflow: hidden;
    border-radius: var(--radius-small);

    img {
      height: 100%;
    }
  }

  .color {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
  .bought {
    opacity: 0.7;
  }
  .buttons {
    width: 100%;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-around;

    > * {
      cursor: pointer;
    }
  }
`;

const ChangePriceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-block: 2rem;
`;

/*







*/

function ProductItem({ product }) {
  const stockColor = product.quantity < 10 ? "danger" : "blue";

  return (
    <StyledProductItem>
      <div className="image">
        <img src={`${IMAGE_URL}/products/${product.image}`} alt={product.name} />
      </div>
      <div className="color" style={{ backgroundColor: product.color }}></div>
      <div style={{ justifySelf: "start" }}>{product.name}</div>
      <div className="prices">
        <p>{formatAmount(product.sellingPrice)}</p>
        <p className="bought">{formatAmount(product.buyingPrice)}</p>
      </div>
      <div className="profit">
        <p>{formatAmount(product.profit)}</p>
        <ColoredText $color="green">{product.profitPercent}%</ColoredText>
      </div>
      <ColoredText $color={stockColor}>{product.quantity}</ColoredText>

      <div className="buttons">
        <Modal>
          <EditProdcut product={product} />
          <RequestSupply product={product} />
        </Modal>
      </div>
    </StyledProductItem>
  );
}

export default ProductItem;

/*




*/

function EditProdcut({ product }) {
  const { updateProduct, isUpdating } = useUpdateProduct();

  const [image, setImage] = useState("");
  const [color, setColor] = useState(product.color);
  const [description, setDescription] = useState(product.description);
  const [sellingPrice, setSellingPrice] = useState(product.sellingPrice / PRICE_UNIT);

  const modalId = product.id;
  const profit = sellingPrice * PRICE_UNIT - product.buyingPrice;
  const profitPercent = Math.round((profit / product.buyingPrice) * 100);
  const profitColor = profit > 0 ? "green" : profit < 0 ? "danger" : "text";

  function handleSubmit(e) {
    if (e.type === "submit") e.preventDefault();

    const data = new FormData();
    data.append("id", product.id);
    data.append("image", image);
    data.append("description", description);
    data.append("color", color);
    data.append("sellingPrice", sellingPrice * PRICE_UNIT);

    updateProduct(data, { onSuccess: () => forceCloseModal(modalId) });
  }

  const clearUpdateForm = () => setImage("");

  return (
    <>
      <Modal.Open openId={modalId}>
        <FiEdit />
      </Modal.Open>

      <Modal.Window id={modalId} afterClose={clearUpdateForm} title="Update Product">
        <Modal.Content>
          <ChangePriceContent className="centeer">
            <div>
              Profit ({formatAmount(profit)} - <ColoredText $color={profitColor}>{profitPercent}%</ColoredText>)
            </div>
          </ChangePriceContent>

          <Modal.Form onSubmit={handleSubmit}>
            <FormGroup disabled={true} label="name" id="name" value={product.name} />
            <FormGroup disabled={true} label="buying" id="buying" value={product.buyingPrice / PRICE_UNIT} />

            <FormGroup
              step="0.01"
              required
              disabled={isUpdating}
              label="selling price"
              id="selling-price"
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
            />
            <FormGroup disabled={isUpdating} label="image" id="image" type="file" onChange={(e) => setImage(e.target.files[0])} />
            <FormGroup
              required
              disabled={isUpdating}
              label="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <FormGroup
              required
              disabled={isUpdating}
              label="color"
              id="color"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />

            <button className="display-off"></button>
          </Modal.Form>
        </Modal.Content>

        <Modal.Footer>
          <ButtonPrimary disabled={isUpdating} onClick={handleSubmit} data="update product" />
        </Modal.Footer>
      </Modal.Window>
    </>
  );
}

//

function RequestSupply({ product }) {
  const { requestSupply, isRequesting } = useRequestSupply();

  const [quantity, setQuantity] = useState("");

  const modalId = `${product.id}-supply-request`;

  const clearRequestForm = () => setQuantity("");

  function handleSubmit() {
    if (!quantity) return;

    requestSupply({ product: product.id, quantity }, { onSuccess: () => forceCloseModal(modalId) });
  }

  return (
    <>
      <Modal.Open openId={modalId}>
        <FiSend />
      </Modal.Open>

      <Modal.Window id={modalId} title="Supply request" afterClose={clearRequestForm}>
        <Modal.Content>
          <ChangePriceContent className="centeer">
            <p>{product.name} </p>
            <FormGroup disabled={isRequesting} step="1" textAlign="center" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </ChangePriceContent>
        </Modal.Content>
        <Modal.Footer>
          <ButtonPrimary disabled={isRequesting} onClick={handleSubmit}>
            send request
          </ButtonPrimary>
        </Modal.Footer>
      </Modal.Window>
    </>
  );
}

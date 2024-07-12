import styled from "styled-components";
import { ButtonPrimary, ButtonPrimaryMini, Spinner } from "../components/elementComponents";
import { IMAGE_URL } from "../utilities/variables";
import { cutString, formatAmount } from "../utilities/utilities";
import { useStoreCart } from "../context/StoreCart";
import Modal from "../context/Modal";

const StyledStoreItem = styled.div`
  background-color: var(--cl-bg-white);
  border-radius: var(--radius-normal);
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  .item-top,
  .item-bottom {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .item-image {
    width: 100%;
    height: 15rem;
    overflow: hidden;
    border-radius: var(--radius-normal);

    img {
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .item-purchase {
    display: flex;
    justify-content: space-between;
    margin-block: 1rem;
    font-size: 2rem;

    strong {
      font-family: "mulish black";
    }

    &-buttons {
      display: flex;
      gap: 1rem;
    }
  }
`;

function StoreItem({ product }) {
  const { currentId, quantity, handleAdd, handleRemove } = useStoreCart();

  const total = currentId === product.id ? quantity : 0;

  return (
    <StyledStoreItem>
      <div className="item-top">
        <div className="item-image">
          <img src={`${IMAGE_URL}/products/${product.image}`} alt={product.name} />
        </div>
        <strong>{product.name}</strong>
        <p>{cutString(product.description)}</p>
      </div>

      <div className="item-top">
        <div className="item-purchase">
          <strong>{formatAmount(product.sellingPrice)}</strong>
          <div className="item-purchase-buttons">
            <ButtonPrimaryMini onClick={() => handleRemove(product.id)}>&nbsp;-&nbsp;</ButtonPrimaryMini>
            <span>{total}</span>
            <ButtonPrimaryMini onClick={() => handleAdd(product.id)}>&nbsp;+&nbsp;</ButtonPrimaryMini>
          </div>
        </div>
        <div className="item-button">
          <BuyButton product={product} />
        </div>
      </div>
    </StyledStoreItem>
  );
}

export default StoreItem;

/*




*/
function BuyButton({ product }) {
  const { currentId, quantity, purchasing, makePurchase } = useStoreCart();

  const disable = product.id !== currentId;
  const modalId = product.id;

  return (
    <Modal>
      <Modal.Open openId={modalId}>
        <ButtonPrimary data="buy" disabled={disable} />
      </Modal.Open>

      <Modal.Window id={modalId} title="Your total const">
        <Modal.Content>
          <div className="center-element">
            <p style={{ marginBlock: "2rem" }}>
              <strong>{formatAmount(quantity * product.sellingPrice)}</strong>
            </p>
            <p>quantity: {quantity}</p>
          </div>
        </Modal.Content>

        <Modal.Footer>
          <ButtonPrimary
            onClick={() => makePurchase(product.sellingPrice, modalId)}
            disabled={purchasing}
            data={purchasing ? <Spinner /> : "continue"}
          />
        </Modal.Footer>
      </Modal.Window>
    </Modal>
  );
}

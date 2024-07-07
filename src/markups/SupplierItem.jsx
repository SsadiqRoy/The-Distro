import styled from "styled-components";
import Modal from "../context/Modal";
import { Button, ButtonPrimary, FormGroup } from "../components/elementComponents";
import { IMAGE_URL, PRICE_UNIT } from "../utilities/variables";
import { forceCloseModal, formatAmount } from "../utilities/utilities";
import { useApproveSupply, useChangeSupplyPrice } from "../hooks/supplyHooks";
import { useState } from "react";
import { ColoredText } from "../components/elements";

const StyledSupplierItem = styled.div`
  width: 100%;
  min-width: 1000px;
  padding: 1rem;
  background-color: var(--cl-bg-white);
  border-bottom: 1px solid var(--cl-border-opacity);

  display: grid;
  grid-template-columns: 1fr 1.5fr 0.3fr 1fr 1fr 1fr 0.2fr 1fr;
  gap: 1.5rem;
  justify-items: center;
  align-items: center;

  > * {
    display: inline-block;
  }

  .image {
    width: 100%;
    overflow: hidden;
    height: 7rem;
    border-radius: var(--radius-small);
  }

  .prices {
    justify-self: left;
    margin-left: 2rem;
  }

  .text-gray {
    opacity: 0.7;
  }
  .text-green {
    color: var(--cl-green);
  }
  .text-red {
    color: var(--cl-danger);
  }

  button {
    max-width: 20rem;
  }
`;

/*




*/

function SupplierItem({ supply }) {
  const { product } = supply;
  const { newPrice } = supply;
  const currentPrice = product.buyingPrice;
  const totalCurrentPrice = currentPrice * supply.quantity;
  const totalNewPrice = newPrice * supply.quantity;
  const profitColor = newPrice > currentPrice ? "green" : newPrice < currentPrice ? "danger" : "blue";

  return (
    <StyledSupplierItem>
      <div className="image">
        <img src={`${IMAGE_URL}/products/${product.image}`} alt={product.name} />
      </div>
      <p style={{ justifySelf: "left" }}>{product.name}</p>
      <p>{supply.quantity}</p>
      <div className="prices">
        <p>{formatAmount(totalCurrentPrice)}</p>
        <p className="text-gray">{formatAmount(currentPrice)}</p>
      </div>
      <div className="prices">
        <p>{formatAmount(totalNewPrice)}</p>
        <ColoredText $color={profitColor}>{formatAmount(newPrice)}</ColoredText>
      </div>

      <Modal>
        <ChangePrice supply={supply} />
        <seperatebuttons></seperatebuttons>
        <ApproveRequest supply={supply} />
      </Modal>
    </StyledSupplierItem>
  );
}

export default SupplierItem;

/*





*/

function ChangePrice({ supply }) {
  const { product } = supply;
  const currentPrice = product.buyingPrice;
  const modalId = supply.id;

  const { updateData, isUpdating } = useChangeSupplyPrice();
  const [price, setPrice] = useState(currentPrice);

  function handleSubmit() {
    if (!price) return;
    updateData({ id: supply.id, newPrice: price }, { onSuccess: () => forceCloseModal(modalId) });
  }

  return (
    <>
      <Modal.Open openId={modalId}>
        <Button disabled={supply.supplierApproved} $outlined={true}>
          Change Price
        </Button>
      </Modal.Open>

      <Modal.Window title="Change Price for" id={modalId}>
        <Modal.Content>
          <div style={{ display: "flex", flexDirection: "column", rowGap: "2rem", alignItems: "center" }}>
            <p>{product.name}</p>
            <strong>{formatAmount(currentPrice)}</strong>
            <FormGroup
              disabled={isUpdating}
              value={price / PRICE_UNIT}
              onChange={(e) => setPrice(e.target.value * PRICE_UNIT)}
              id="price"
              textAlign="center"
              type="number"
              step="0.01"
            />
          </div>
        </Modal.Content>

        <Modal.Footer>
          <ButtonPrimary disabled={isUpdating} onClick={handleSubmit} data="Update Price" />
        </Modal.Footer>
      </Modal.Window>
    </>
  );
}

//

function ApproveRequest({ supply }) {
  const { product } = supply;
  const { newPrice } = supply;
  const totalNewPrice = newPrice * supply.quantity;
  const modalId = "approve-" + supply.id;

  const { updateData, isUpdating } = useApproveSupply();

  function handleApprove() {
    updateData({ id: supply.id, supplierApproved: true }, { onSuccess: () => forceCloseModal(modalId) });
  }

  return (
    <>
      <Modal.Open openId={modalId}>
        <Button disabled={supply.supplierApproved} data="approve" />
      </Modal.Open>

      <Modal.Window id={modalId}>
        <Modal.Content>
          <div className="center-element" style={{ display: "flex", flexDirection: "column", rowGap: "2rem", alignItems: "center" }}>
            <p>
              Are you sure you want to approve supply request for <br /> {product.name}
            </p>
            <div style={{ marginBlock: "1rem 3rem" }}>
              <strong>{formatAmount(totalNewPrice)}</strong>
              <p style={{ marginTop: "5px" }}>({formatAmount(newPrice)} per unit)</p>
            </div>
          </div>
        </Modal.Content>

        <Modal.Footer>
          <ButtonPrimary disabled={isUpdating} onClick={handleApprove} data="approve request" />
        </Modal.Footer>
      </Modal.Window>
    </>
  );
}

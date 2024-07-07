import styled from "styled-components";
import { ColoredText } from "../components/elements";
import { Button, ButtonPrimary } from "../components/elementComponents";
import { IMAGE_URL } from "../utilities/variables";
import { forceCloseModal, formatAmount } from "../utilities/utilities";
import Modal from "../context/Modal";
import { useAcceptSupply, useCancelSupply } from "../hooks/supplyHooks";

const StyledSupplyItem = styled.div`
  padding: 1.4rem 1rem;
  border-bottom: 1px solid var(--cl-border-opacity);

  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr 1fr 1fr 1fr;
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

  .name,
  .prices {
    justify-self: left;
  }
`;

/*





*/

function SupplyItem({ supply, number = 5 }) {
  const { product } = supply;
  const { newPrice } = supply;
  const currentPrice = product.buyingPrice;
  const totalCurrentPrice = currentPrice * supply.quantity;
  const totalNewPrice = newPrice * supply.quantity;
  const profitColor = newPrice < currentPrice ? "green" : newPrice > currentPrice ? "danger" : "blue";

  return (
    <StyledSupplyItem>
      <div className="image">
        <img src={`${IMAGE_URL}/products/${product.image}`} alt={product.name} />
      </div>
      <div className="name">{product.name}</div>
      <p>{supply.quantity}</p>
      <div className="prices">
        <p>{formatAmount(totalCurrentPrice)}</p>
        <p className="opacity-7">{formatAmount(currentPrice)}</p>
      </div>
      <div className="prices">
        <ColoredText $color="text">{formatAmount(totalNewPrice)}</ColoredText>
        <div>
          <ColoredText $color={profitColor} className="opacity-7">
            {formatAmount(newPrice)}
          </ColoredText>
        </div>
      </div>

      {!supply.active && supply.requesterAccepted && (
        <>
          <span></span> <ColoredText $color="green">Accepted</ColoredText>
        </>
      )}
      {!supply.active && !supply.requesterAccepted && (
        <>
          <span></span> <ColoredText $color="danger">Canceled</ColoredText>
        </>
      )}

      <ActionButtons supply={supply} />
    </StyledSupplyItem>
  );
}

export default SupplyItem;

/*





*/

function ActionButtons({ supply }) {
  const { isUpdating: canceling, updateData: cancelSupply } = useCancelSupply();
  const { isUpdating: accepting, updateData: acceptSupply } = useAcceptSupply();

  const { product } = supply;
  const { newPrice } = supply;
  const totalNewPrice = newPrice * supply.quantity;

  const modalIdCancel = "cancel-" + supply.id;
  const modalIdAccept = "accept-" + supply.id;

  function handleCancel() {
    acceptSupply({ id: supply.id }, { onSuccess: () => forceCloseModal(modalIdCancel) });
  }
  function handleAccept() {
    acceptSupply({ requesterAccepted: true, id: supply.id }, { onSuccess: () => forceCloseModal(modalIdAccept) });
  }

  return (
    <Modal>
      {supply.active && !supply.supplierApproved && (
        <>
          <span></span>
          <Modal.Open openId={modalIdCancel}>
            <Button $color="danger" $outlined={true} $size="small" data="cancel" />
          </Modal.Open>
        </>
      )}

      {supply.active && supply.supplierApproved && (
        <>
          <Modal.Open openId={modalIdCancel}>
            <Button $color="danger" $outlined={true} $size="small" data="cancel" />
          </Modal.Open>
          <Modal.Open openId={modalIdAccept}>
            <Button $color="green" $outlined={true} $size="small" data="accept" />
          </Modal.Open>
        </>
      )}

      <Modal.Window id={modalIdCancel}>
        <Modal.Content>
          <div className="center-element" style={{ display: "flex", flexDirection: "column", rowGap: "2rem", alignItems: "center" }}>
            <p>
              Are you sure you want to <strong>cancel</strong> supply request for
            </p>
            <ColoredText $color="blue">{product.name}</ColoredText>
            <div style={{ marginBlock: "1rem 3rem" }}>
              <strong>{formatAmount(totalNewPrice)}</strong>
              <p style={{ marginTop: "5px" }}>({formatAmount(newPrice)} per unit)</p>
            </div>
          </div>
        </Modal.Content>

        <Modal.Footer>
          <Button onClick={handleCancel} disabled={canceling} $color="danger" $shape="square" $size="large" data="cancel request" />
        </Modal.Footer>
      </Modal.Window>

      <Modal.Window id={modalIdAccept}>
        <Modal.Content>
          <div className="center-element" style={{ display: "flex", flexDirection: "column", rowGap: "2rem", alignItems: "center" }}>
            <p>
              You are about to <strong>accpet</strong> pricing for
            </p>
            <ColoredText $color="blue">{product.name}</ColoredText>
            <div style={{ marginBlock: "1rem 3rem" }}>
              <strong>{formatAmount(totalNewPrice)}</strong>
              <p style={{ marginTop: "5px" }}>({formatAmount(newPrice)} per unit)</p>
            </div>
          </div>
        </Modal.Content>

        <Modal.Footer>
          <Button onClick={handleAccept} disabled={accepting} $color="green" $shape="square" $size="large" data="accept" />
        </Modal.Footer>
      </Modal.Window>
    </Modal>
  );
}

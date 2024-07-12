import styled from "styled-components";
import { ColoredText } from "../components/elements";
import { Button, Spinner } from "../components/elementComponents";
import { IMAGE_URL } from "../utilities/variables";
import { forceCloseModal, formatAmount } from "../utilities/utilities";
import Modal from "../context/Modal";
import { useUpdatePurchaseFree } from "../hooks/purchaseHooks";

const StyledPurchaseItem = styled.div`
  padding: 1.3rem 1rem;
  border-bottom: 1px solid var(--cl-border-opacity);

  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr 1fr 1fr 1fr 1fr;
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

  .name {
    justify-self: left;
  }
`;

function PurchaseItem({ purchase, filter }) {
  const { product } = purchase;

  return (
    <StyledPurchaseItem>
      <div className="image">
        <img src={`${IMAGE_URL}/products/${product.image}`} alt={product.name} />
      </div>
      <div className="name">
        <p>{product.name}</p>
        <p className="opacity-5" style={{ fontSize: "1.2rem" }}>
          {purchase.purchaseId}
        </p>
      </div>
      <p>{purchase.quantity}</p>
      <p>{formatAmount(purchase.price)}</p>
      <p>{formatAmount(purchase.price * purchase.quantity)}</p>
      <p>{product.quantity}</p>

      <ActionButtons purchase={purchase} filter={filter} />
    </StyledPurchaseItem>
  );
}

export default PurchaseItem;

/*









*/

function ActionButtons({ purchase, filter }) {
  const { isUpdating, updateData } = useUpdatePurchaseFree(filter);

  const { product } = purchase;
  const permitBoth = purchase.status === "pending" && product.quantity >= purchase.quantity;
  const permitDecline = purchase.status === "pending" && product.quantity < purchase.quantity;
  const modalIdDecline = "decline-" + purchase.id;
  const modalIdApprove = purchase.id;

  const approve = () => updateData({ id: purchase.id, status: "approved" }, { onSuccess: () => forceCloseModal(modalIdApprove) });
  const decline = () => updateData({ id: purchase.id, status: "declined" }, { onSuccess: () => forceCloseModal(modalIdDecline) });

  return (
    <Modal>
      <>
        {purchase.status === "approved" && (
          <>
            <span></span>
            <ColoredText $color="green">Approved</ColoredText>
          </>
        )}
        {purchase.status === "declined" && (
          <>
            <span></span>
            <ColoredText $color="danger">Declined</ColoredText>
          </>
        )}
        {permitDecline && (
          <>
            <span></span>
            <Modal.Open openId={modalIdDecline}>
              <Button $color="danger" $size="small" data="decline" />
            </Modal.Open>
          </>
        )}

        {permitBoth && (
          <>
            <Modal.Open openId={modalIdDecline}>
              <Button $color="danger" $size="small" data="decline" />
            </Modal.Open>
            <Modal.Open openId={modalIdApprove}>
              <Button $color="green" $size="small" data="approve" />
            </Modal.Open>
          </>
        )}
      </>

      <Modal.Window id={modalIdDecline}>
        <Modal.Content>
          <div className="center-element" style={{ display: "flex", flexDirection: "column", rowGap: "2rem", alignItems: "center" }}>
            <p>
              Are you sure you want to <strong>Decline</strong> purchase request for
            </p>
            <ColoredText $color="blue">{product.name}</ColoredText>
            <div style={{ marginBlock: "1rem 3rem" }}>
              <strong>{formatAmount(purchase.price * purchase.quantity)}</strong>
              <p style={{ marginTop: "5px" }}>({purchase.quantity} unit)</p>
            </div>
          </div>
        </Modal.Content>

        <Modal.Footer>
          <Button
            disabled={isUpdating}
            onClick={decline}
            $color="danger"
            $shape="square"
            $size="large"
            data={isUpdating ? <Spinner /> : "decline request"}
          />
        </Modal.Footer>
      </Modal.Window>

      <Modal.Window id={modalIdApprove}>
        <Modal.Content>
          <div className="center-element" style={{ display: "flex", flexDirection: "column", rowGap: "2rem", alignItems: "center" }}>
            <p>
              You are about to <strong>Approve</strong> purchase request for
            </p>
            <ColoredText $color="blue">{product.name}</ColoredText>
            <div style={{ marginBlock: "1rem 3rem" }}>
              <strong>{formatAmount(purchase.price * purchase.quantity)}</strong>
              <p style={{ marginTop: "5px" }}>({purchase.quantity} unit)</p>
            </div>
          </div>
        </Modal.Content>

        <Modal.Footer>
          <Button
            disabled={isUpdating}
            onClick={approve}
            $color="green"
            $shape="square"
            $size="large"
            data={isUpdating ? <Spinner /> : "approve purchase"}
          />
        </Modal.Footer>
      </Modal.Window>
    </Modal>
  );
}

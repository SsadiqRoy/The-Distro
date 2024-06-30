import styled from "styled-components";
import Modal from "../context/Modal";
import { Button, ButtonPrimary } from "../components/elements";
import { FormGroup } from "../components/elementComponents";

const StyledSupplierItem = styled.div`
  width: 100%;
  min-width: 1000px;
  padding: 1rem;
  background-color: var(--cl-bg-white);
  border-bottom: 1px solid var(--cl-border-opacity);

  display: grid;
  grid-template-columns: 1fr 1.5fr 0.3fr 1fr 1fr 1fr 0.2fr 1fr;
  gap: 0.5rem;
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

function SupplierItem({ id }) {
  const style = {
    display: "flex",
    flexDirection: "column",
    rowGap: "2rem",
  };

  return (
    <StyledSupplierItem>
      <div className="image">
        <img src="/images/Lady Calf Jumper Boots.jpg" alt="Item" />
      </div>
      <p>Lady Jumper Boots</p>
      <p>7500</p>
      <div className="current-prices">
        <p>$70,000.00</p>
        <p className="text-gray">$76.00</p>
      </div>
      <div className="new-prices">
        <p>$86,000.00</p>
        <p className="text-green">$82.00</p>
      </div>

      <Modal>
        <Modal.Open openId={id}>
          <Button $outlined={true}>Change Price</Button>
        </Modal.Open>

        <Modal.Window title={``} id={id}>
          <Modal.Content>
            <div className="center-element" style={style}>
              <p>Lumber Jack Boots</p>
              <strong>$86.00</strong>
              <FormGroup id="price" textAlign="center" />
            </div>
          </Modal.Content>
          <Modal.Footer>
            <ButtonPrimary>Update Price</ButtonPrimary>
          </Modal.Footer>
        </Modal.Window>
      </Modal>

      <span></span>
      <Button>approve</Button>
    </StyledSupplierItem>
  );
}

export default SupplierItem;

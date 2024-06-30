import styled from "styled-components";
import { Button, ColoredText } from "../components/elements";

const StyledPurchaseItem = styled.div`
  padding: 1rem;
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

function PurchaseItem({ number }) {
  return (
    <StyledPurchaseItem>
      <div className="image">
        <img src="/images/Lumber Jack Boots.jpeg" alt="Item" />
      </div>
      {number > 3 && <div className="name">Handmade Men's </div>}
      {number <= 3 && <div className="name">Handmade Men's Oxford Dress Boots</div>}
      <p>6</p>
      <p>$47.00</p>
      <p>$235.00</p>
      <p>74</p>

      {number === 1 && (
        <>
          <span></span>
          <Button $color="danger" $size="small">
            decline
          </Button>
        </>
      )}
      {number === 2 && (
        <>
          <span></span>
          <Button $color="green" $size="small">
            approve
          </Button>
        </>
      )}
      {number === 3 && (
        <>
          <span></span>
          <ColoredText $color="danger">Declined</ColoredText>
        </>
      )}
      {number === 4 && (
        <>
          <span></span>
          <ColoredText $color="green">Approved</ColoredText>
        </>
      )}
      {number === 5 && (
        <>
          <Button $color="danger" $size="small">
            decline
          </Button>
          <Button $color="green" $size="small" disabled>
            approve
          </Button>
        </>
      )}
    </StyledPurchaseItem>
  );
}

export default PurchaseItem;

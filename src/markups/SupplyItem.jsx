import styled from "styled-components";
import { Button, ColoredText } from "../components/elements";

const StyledSupplyItem = styled.div`
  padding: 1rem;
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

  .name {
    justify-self: left;
  }
`;

function SupplyItem({ number }) {
  return (
    <StyledSupplyItem>
      <div className="image">
        <img src="/images/Lumber Jack Boots.jpeg" alt="Item" />
      </div>
      {number > 3 && <div className="name">Handmade Men's </div>}
      {number <= 3 && <div className="name">Handmade Men's Oxford Dress Boots</div>}
      <p>270</p>
      <div className="prices">
        <p>$21,00.00</p>
        <p className="opacity-7">$78.00</p>
      </div>
      <div className="prices">
        <ColoredText $color="blue">$22,140.00</ColoredText>
        <ColoredText $color="blue" className="opacity-7">
          $82.00
        </ColoredText>
      </div>
      {number === 1 && (
        <>
          <span></span>
          <Button $color="danger" $outlined={true} $size="small">
            cancel
          </Button>
        </>
      )}
      {number === 2 && (
        <>
          <span></span>
          <Button $color="green" $outlined={true} $size="small">
            approve
          </Button>
        </>
      )}
      {number === 3 && (
        <>
          <span></span>
          <ColoredText $color="danger">Canceled</ColoredText>
        </>
      )}
      {number === 4 && (
        <>
          <span></span>
          <ColoredText $color="green">Accepted</ColoredText>
        </>
      )}
      {number === 5 && (
        <>
          <Button $color="danger" $outlined={true} $size="small">
            cancel
          </Button>
          <Button $color="green" $outlined={true} $size="small">
            approve
          </Button>
        </>
      )}
    </StyledSupplyItem>
  );
}

export default SupplyItem;

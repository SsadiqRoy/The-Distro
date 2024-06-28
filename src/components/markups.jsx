// import { HiMinus, HiPlus } from 'react-icons/hi2';
import styled from "styled-components";
import { Button, ButtonPrimary, ButtonPrimaryMini } from "./elements";

const StyledStoreItem = styled.div`
  background-color: var(--cl-bg-white);
  border-radius: var(--radius-normal);
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

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
export function StoreItem() {
  return (
    <StyledStoreItem>
      <div className="item-image">
        <img src="/images/Lumber Jack Boots.jpeg" alt="Product" />
      </div>
      <strong>Lumber Jack Boots</strong>
      <p>
        These boots are perfect for both casual and dressier occasions, offering
        comfort and rugged style.
      </p>

      <div className="item-purchase">
        <strong>$78.00</strong>
        <div className="item-purchase-buttons">
          <ButtonPrimaryMini>&nbsp;-&nbsp;</ButtonPrimaryMini>
          <span>4</span>
          <ButtonPrimaryMini>&nbsp;+&nbsp;</ButtonPrimaryMini>
        </div>
      </div>
      <div className="item-button">
        <ButtonPrimary>buy</ButtonPrimary>
      </div>
    </StyledStoreItem>
  );
}

const StyledSupplierItem = styled.div`
  width: 100%;
  min-width: 1000px;
  padding: 1rem;
  border-radius: var(--radius-normal);
  background-color: var(--cl-bg-white);

  display: grid;
  grid-template-columns: 1fr 1.5fr 0.3fr 1fr 1fr 1fr 0.2fr 1fr;
  gap: 0.5rem;
  justify-items: center;
  align-items: center;
  margin-bottom: 1rem;

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
export function SupplierItem() {
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
      <Button outlined={true}>Change Price</Button>
      <span></span>
      <Button>approve</Button>
    </StyledSupplierItem>
  );
}

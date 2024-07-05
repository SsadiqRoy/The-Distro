import styled from "styled-components";
import { ButtonPrimary, ButtonPrimaryMini } from "../components/elementComponents";

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

function StoreItem() {
  return (
    <StyledStoreItem>
      <div className="item-image">
        <img src="/images/Lumber Jack Boots.jpeg" alt="Product" />
      </div>
      <strong>Lumber Jack Boots</strong>
      <p>These boots are perfect for both casual and dressier occasions, offering comfort and rugged style.</p>

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

export default StoreItem;

import styled from "styled-components";
import { FiEdit, FiSend } from "react-icons/fi";

import Modal from "../context/Modal";
import { ColoredText } from "../components/elements";
import { ButtonPrimary, FormGroup } from "../components/elementComponents";

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

function ProductItem({ color }) {
  return (
    <StyledProductItem>
      <div className="image">
        <img src="/images/Lady Calf Jumper Boots.jpg" alt="Item" />
      </div>
      <div className="color" style={{ backgroundColor: `var(--cl-product-${color})` }}></div>
      <div>Handmade Men's Oxford Dress Boots</div>
      <div className="prices">
        <p>$78.00</p>
        <p className="bought">$56.00</p>
      </div>
      <div className="profit">
        <p>$22.00</p>
        <ColoredText $color="green">38%</ColoredText>
      </div>
      <ColoredText $color="danger">3</ColoredText>

      <div className="buttons">
        <Modal>
          <Modal.Open openId="edit">
            <FiEdit />
          </Modal.Open>
          <Modal.Open openId="request">
            <FiSend />
          </Modal.Open>

          <Modal.Window id="edit" title="Change product pricing">
            <Modal.Content>
              <ChangePriceContent className="centeer">
                <p>Lumber Jack Boots</p>
                <strong>78.00</strong>
                <FormGroup textAlign="center" />
                <div>
                  $31.00 - <ColoredText $color="green">35%</ColoredText>
                </div>
              </ChangePriceContent>
            </Modal.Content>
            <Modal.Footer>
              <ButtonPrimary>Change Price</ButtonPrimary>
            </Modal.Footer>
          </Modal.Window>

          <Modal.Window id="request" title="Supply request">
            <Modal.Content>
              <ChangePriceContent className="centeer">
                <p>Lumber Jack Boots</p>
                <FormGroup textAlign="center" />
              </ChangePriceContent>
            </Modal.Content>
            <Modal.Footer>
              <ButtonPrimary>send request</ButtonPrimary>
            </Modal.Footer>
          </Modal.Window>
        </Modal>
      </div>
    </StyledProductItem>
  );
}

export default ProductItem;

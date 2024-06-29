import styled from "styled-components";

import { FormGroup } from "../components/elementComponents";
import { Button, ButtonPrimary } from "../components/elements";
import Modal from "../context/Modal";

const StyledCotent = styled.div`
  width: 100%;
  height: 20rem;
  overflow: auto;
  background-color: var(--cl-bg-white);
  padding: 2.5rem;
  border-radius: var(--radius-normal);
`;

const Account = styled.div`
  .image {
    text-align: center;
    margin-bottom: 3rem;

    div {
      display: inline-block;
      width: 7rem;
      height: 7rem;
      border-radius: 50%;
      overflow: hidden;

      img {
        height: 100%;
      }
    }
  }

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem 4rem;

    button {
      grid-row: 3;
      grid-column: 2;
    }
  }
`;

const Password = styled.div`
  margin-top: 10rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 4rem;

  form {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    button {
      margin-top: 1rem;
    }
  }

  > :nth-child(2) {
    align-self: end;
  }
`;

/*





*/
function Profile() {
  return (
    <StyledCotent>
      <Account>
        <div className="image">
          <div>
            <img src="/images/profile-image.jpg" alt="The Distro Logo" />
          </div>
        </div>
        <form>
          <FormGroup lable="surname" id="surname" />
          <FormGroup lable="email" id="email" />
          <FormGroup lable="other name" id="other-name" />
          <FormGroup lable="image" id="image" type="file" />

          <Button $shape="square" $size="large">
            Save
          </Button>
        </form>
      </Account>

      <Password>
        <div>
          <div className="center-element">
            <strong>Change Password</strong>
          </div>

          <form>
            <FormGroup lable="Current Password" id="current-password" type="password" />
            <FormGroup lable="New Password" id="password" type="password" />
            <FormGroup lable="confirm Password" id="confirm-password" type="password" />

            <Button $shape="square" $size="large">
              Save
            </Button>
          </form>
        </div>

        <div>
          <Modal>
            <Modal.Open openId="new-admin">
              <ButtonPrimary>Add New Admin</ButtonPrimary>
            </Modal.Open>

            <Modal.Window id="new-admin" title="Add New Admin">
              <Modal.Content>
                <FormGroup lable="surname" id="surname" />
                <FormGroup lable="other name" id="other-name" />
                <FormGroup lable="email" id="email" type="email" />
                <FormGroup lable="password" id="password" type="password" />
                <FormGroup lable="confirm-password" id="confirm-password" type="password" />
              </Modal.Content>
              <Modal.Footer>
                <ButtonPrimary>Add Admin</ButtonPrimary>
              </Modal.Footer>
            </Modal.Window>
          </Modal>
        </div>
      </Password>
    </StyledCotent>
  );
}

export default Profile;

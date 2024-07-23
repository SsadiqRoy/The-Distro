import styled from "styled-components";

import { Button, FormGroup, FormGroupFree } from "../components/elementComponents";
import { useAdminCtx } from "../context/OnlyLoggedIn";
import { IMAGE_URL } from "../utilities/variables";
import { useState } from "react";
import { useUpdateAdmin, useUpdatePassword } from "../hooks/adminHooks";
import { useForm } from "react-hook-form";
import { FormInput, InputLabel } from "../components/elements";
import AddAdmin from "../components/AddAdmin";
import DashboardHeading from "../layouts/DashboardHeading";

const StyledCotent = styled.div`
  width: 100%;
  height: 20rem;
  overflow: auto;
  background-color: var(--cl-bg-white);
  padding: 2.5rem;
  border-radius: var(--radius-normal);

  &::-webkit-scrollbar {
    display: none;
  }
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

    @media (max-width: 37.5em) {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;

      button {
        margin-top: 1rem;
      }
    }

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

  @media (max-width: 37.5em) {
    display: block;
  }

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

    @media (max-width: 37.5em) {
      margin-top: 7rem;
    }
  }
`;

/*





*/

function Profile() {
  const { admin } = useAdminCtx();
  const { updatingAdmin, updateAdmin } = useUpdateAdmin();
  const [surname, setSurname] = useState(admin.surname);
  const [otherNames, setOtherNames] = useState(admin.otherNames);
  const [email, setEmail] = useState(admin.email);
  const [file, setFile] = useState(null);

  const { updatingPassword, updatePassword } = useUpdatePassword();
  const { handleSubmit, register, formState, reset, getValues } = useForm();
  const { errors } = formState;

  const registerCurPas = register("currentPassword", { required: "current password is required" });
  const registerNewpas = register("newPassword", { required: "new password is required" });
  const registerConfPas = register("confirmPassword", {
    required: "confirm your password",
    validate: (v) => v === getValues().newPassword || "Passwords do not match",
  });

  function handleUpdate(e) {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("surname", surname);
    formdata.append("otherNames", otherNames);
    formdata.append("email", email);
    formdata.append("image", file?.length ? file[0] : "");

    updateAdmin(formdata, {
      onSuccess: () => {
        setFile(null);
        document.getElementById("admin-image").value = "";
      },
    });
  }

  function handlePassword({ currentPassword, newPassword }) {
    updatePassword({ currentPassword, newPassword }, { onSuccess: () => reset() });
  }

  return (
    <>
      <DashboardHeading range={false} sort={false} />

      <StyledCotent>
        <Account>
          <div className="image">
            <div>
              <img src={`${IMAGE_URL}/admins/${admin.image}`} alt={admin.fullname} title={admin.fullname} />
            </div>
          </div>
          <form onSubmit={handleUpdate}>
            <FormGroup disabled={updatingAdmin} label="surname" id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
            <FormGroup
              disabled={updatingAdmin}
              label="other name"
              id="other-name"
              value={otherNames}
              onChange={(e) => setOtherNames(e.target.value)}
            />
            <FormGroup disabled={true} label="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <FormGroup disabled={updatingAdmin} label="image" id="admin-image" type="file" files={file} onChange={(e) => setFile(e.target.files)} />

            <Button data="Save" $shape="square" $size="large" disabled={updatingAdmin} />
          </form>
        </Account>

        <Password>
          <div>
            <div className="center-element">
              <strong>Change Password</strong>
            </div>

            <form onSubmit={handleSubmit(handlePassword)}>
              <FormGroupFree>
                <InputLabel>
                  current password
                  <span>{errors?.currentPassword?.message}</span>
                </InputLabel>
                <FormInput disabled={updatingPassword} id="current-password" type="password" {...registerCurPas} />
              </FormGroupFree>

              <FormGroupFree>
                <InputLabel>
                  new password
                  <span>{errors?.newPassword?.message}</span>
                </InputLabel>
                <FormInput disabled={updatingPassword} id="new-password" type="password" {...registerNewpas} />
              </FormGroupFree>

              <FormGroupFree>
                <InputLabel>
                  confirm password
                  <span>{errors?.confirmPassword?.message}</span>
                </InputLabel>
                <FormInput disabled={updatingPassword} id="confirm-password" type="password" {...registerConfPas} />
              </FormGroupFree>

              <Button disabled={updatingPassword} $shape="square" $size="large" data="save" />
            </form>
          </div>

          <div>
            <AddAdmin />
          </div>
        </Password>
      </StyledCotent>
    </>
  );
}

export default Profile;

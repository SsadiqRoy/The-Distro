import { useState } from "react";
import Modal from "../context/Modal";
import { useAddAdmin } from "../hooks/adminHooks";
import { ButtonPrimary, FormGroup } from "./elementComponents";
import toast from "react-hot-toast";

function AddNewAdmin() {
  const { addAdmin, addingAdmin } = useAddAdmin();

  const [surname, setSurname] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const modalId = "new-admin-modal";

  function handleNewAdmin(e) {
    if (e.type === "submit") e.preventDefault();
    if (password !== confirmPassword) return toast.error("Passwords do not match");

    const data = { surname: surname, otherNames: otherNames, email: email, password: password };
    addAdmin(data, { onSuccess: closeModal });
  }

  function clearNewAdminForm() {
    setSurname("");
    setOtherNames("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  function closeModal() {
    const modal = document.getElementById(modalId);
    modal.parentElement.click();
  }

  return (
    <Modal>
      <Modal.Open openId={modalId}>
        <ButtonPrimary data="Add New Admin" />
      </Modal.Open>

      <Modal.Window id={modalId} title="Add New Admin" afterClose={clearNewAdminForm}>
        <Modal.Content>
          <form onSubmit={handleNewAdmin}>
            <FormGroup disabled={addingAdmin} required label="surname" id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
            <FormGroup
              disabled={addingAdmin}
              required
              label="other name"
              id="other-name"
              value={otherNames}
              onChange={(e) => setOtherNames(e.target.value)}
            />
            <FormGroup
              disabled={addingAdmin}
              required
              label="email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormGroup
              disabled={addingAdmin}
              label="password"
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormGroup
              disabled={addingAdmin}
              label="confirm password"
              id="confirm-password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button style={{ display: "none" }}></button>
          </form>
        </Modal.Content>
        <Modal.Footer>
          <ButtonPrimary disabled={addingAdmin} onClick={handleNewAdmin} data="add admin" />
        </Modal.Footer>
      </Modal.Window>
    </Modal>
  );
}

export default AddNewAdmin;

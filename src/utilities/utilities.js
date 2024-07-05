export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) || "Email is not valid";
}

export function getErrMessage(error) {
  return error.message || error._message || error.originalMessage;
}

export function submitFormOnBtnClick(btnid, formid) {
  console.log(btnid);
  console.log(formid);
  if (!btnid || !formid) return;

  const btn = document.getElementById(btnid);
  const form = document.getElementById(formid);

  btn.addEventListener("click", () => form.submit());
}

import { PRICE_UNIT } from "./variables";

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

export function toSearchString(filter) {
  if (!filter) return "";
  const filterArrary = Object.entries(filter);

  const filters = filterArrary.flatMap(([key, value]) => {
    if (typeof value === "string") return `${key}=${value}`;
    if (value.length) return `${key}=${value.join(",")}`;
    if (typeof value === "object") return innerSearchString(key, value);

    return `${key}=${value}`;
  });

  return "?" + filters.join("&");
}

function innerSearchString(key, filter = {}) {
  const filterArrary = Object.entries(filter);
  return filterArrary.map(([op, value]) => `${key}[${op}]=${value}`);
}

export function fromSearchString(string) {
  if (!string || !string.length) return {};

  const arrOfArrays = string
    .slice(1)
    .split("&")
    .map((s) => s.split("="));
  const searchObj = {};

  // console.log(arrOfArrays);

  arrOfArrays.forEach(([key, value]) => {
    let mainKey = key;
    let subKey = "";
    value = value.includes(",") ? value.split(",") : value;
    value = value === "true" ? true : value === "false" ? false : value;

    if (key.includes("[")) {
      [mainKey, subKey] = key.slice(0, -1).split("[");
    }

    if (searchObj[mainKey]) {
      subKey && (searchObj[mainKey][subKey] = value);
      !subKey && (searchObj[mainKey] = value);
      return;
    }

    subKey && (searchObj[mainKey] = { [subKey]: value });
    !subKey && (searchObj[mainKey] = value);
  });

  return searchObj;
}

export function aggregationSearchString(filter, urlFilter) {
  if (filter) urlFilter && (filter = filter + "&" + urlFilter);
  if (!filter) urlFilter && (filter = "?" + urlFilter);

  filter = fromSearchString(filter);
  filter = toSearchString(filter);

  return filter;
}

export function formatAmount(value, currency = "usd") {
  value = value / PRICE_UNIT;
  const format = new Intl.NumberFormat(undefined, { style: "currency", currency }).format(value);

  return format;
}

export function forceCloseModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.parentElement.click();
}

export function getCurrentPage() {
  const pathname = window.location.pathname.split("/")[1];

  return pathname;
}

export function cutString(content = "", max = 60) {
  if (content.length <= max) return content;
  const cutTo = max - 3;
  let cutContent = content.slice(0, cutTo) + "...";

  return cutContent;
}

export function structure(data) {
  const dates = [...new Set(data.map((d) => d.date))];
  const products = [...new Set(data.map((d) => JSON.stringify({ id: d.product, name: d.name })))].map((p) => JSON.parse(p));

  const newd = dates.map((date) => {
    const sales = data.filter((d) => d.date === date).reduce((a, b) => a + b.sales, 0);

    const obj = {
      date: date,
      sales,
    };

    products.forEach((p) => {
      obj[p.id] = calProductSales(date, p.id);
    });

    return obj;
  });

  function calProductSales(date, productid) {
    return data
      .filter((d) => d.date === date)
      .filter((d) => d.product === productid)
      .reduce((cur, acc) => cur + acc.sales, 0);
  }

  return { data: newd, products };
}

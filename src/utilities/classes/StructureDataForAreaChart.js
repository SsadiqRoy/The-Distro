class StructureDataForAreaChart {
  #data;
  #dates;
  #products;
  #newData;

  constructor(data) {
    this.#data = data;
    this.#dates = [];
    this.#products = [];

    this.#execute();
  }

  get dates() {
    return this.#dates;
  }
  get products() {
    return this.#products;
  }
  get data() {
    return this.#newData;
  }

  #execute() {
    this.#getDates();
    this.#getProducts();
    this.#structureData();
  }

  #structureData() {
    this.#newData = this.#dates.map((date) => {
      const sales = this.#data.filter((d) => d.date === date).reduce((a, b) => a + b.sales, 0);

      const obj = {
        date: new Intl.DateTimeFormat(undefined, { month: "short", year: "2-digit", day: "2-digit" }).format(new Date(date)),
        sales,
      };

      this.#products.forEach((p) => {
        obj[p.name] = this.#calProductSales(date, p.id);
      });

      return obj;
    });
  }

  #getDates() {
    this.#dates = [...new Set(this.#data.map((d) => d.date))];
  }
  #getProducts() {
    this.#products = [...new Set(this.#data.map((d) => JSON.stringify({ id: d.product, name: d.name, color: d.color })))].map((p) => JSON.parse(p));
  }
  #calProductSales(date, productid) {
    return this.#data
      .filter((d) => d.date === date)
      .filter((d) => d.product === productid)
      .reduce((cur, acc) => cur + acc.sales, 0);
  }
}

export default StructureDataForAreaChart;

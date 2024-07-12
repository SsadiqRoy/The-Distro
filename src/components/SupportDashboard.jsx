import styled from "styled-components";
import PurchaseItem from "../markups/PurchaseItem";
import { useEffect, useState } from "react";
import { useGetPurchasesFree } from "../hooks/purchaseHooks";
import { DisplayAltMessage, Spinner } from "./elementComponents";
import { MdAttachMoney, MdOutlinePending } from "react-icons/md";
import { AiOutlineFieldTime } from "react-icons/ai";
import { BsBoxes } from "react-icons/bs";
import { useGetSuppliesFree } from "../hooks/supplyHooks";
import { useGetProductsFree } from "../hooks/productHooks";
import { useGetWallet } from "../hooks/adminHooks";
import { cutString, formatAmount } from "../utilities/utilities";
import { SUMMARY_FILTER_PRODUCTS, SUMMARY_FILTER_PURCHASE, SUMMARY_FILTER_SUPPLIES } from "../utilities/variables";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useGetSales, useGetShares } from "../hooks/globalHooks";
import { FaCheck } from "react-icons/fa6";
import StructureDataForAreaChart from "../utilities/classes/StructureDataForAreaChart";

const SummaryContainer = styled.div`
  margin-block: 1rem 2rem;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  gap: 1.5rem;
`;
const StyledSummaryItem = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: var(--cl-bg-white);
  border-radius: var(--radius-normal);

  display: grid;
  grid-template-columns: 0.5fr 2fr;
  gap: 1rem;

  .icon {
    justify-self: center;
    align-self: center;

    font-size: 5rem;
    width: 1em;
    height: 1em;
    background-color: ${(p) => `${p.$color}40`};
    color: ${(p) => p.$color};
    border-radius: 50%;

    span {
      display: grid;
      justify-items: center;
      align-items: center;

      transform: scale(${(p) => p.$iconScale || 0.7});
      width: 100%;
      height: 100%;
    }
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-transform: capitalize;

    strong {
      font-size: ${(p) => p.$fontSize || "2rem"};
    }
  }
`;
const StyledShareItem = styled.div`
  height: 30rem;
  border-radius: var(--radius-normal);
  background-color: var(--cl-bg-white);
  padding: 1.5rem;
  text-transform: capitalize;

  display: flex;
  gap: 1rem;

  .chart-container {
    flex-basis: 70%;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    strong {
      font-size: 2rem;
    }
    .chart {
      flex-grow: 1;
      max-height: 85%;

      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
const StyledShareIndicator = styled.div`
  display: flex;
  gap: 1rem;
  align-items: end;

  span {
    width: 4rem;
    height: 1.5rem;
    background-color: ${(p) => p.$color || "dodgerblue"};
    border-radius: 2px;
  }
`;
const StyledGraphCheck = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  text-transform: capitalize;

  input[type="checkbox"] {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;

    &:checked ~ div span {
      transform: scale(1);
    }
  }

  div {
    width: 2rem;
    height: 2rem;
    border: 2px solid ${(p) => p.$color || "var(--cl-product-1)"};
    border-radius: 3px;

    display: inline-block;
    position: relative;

    span {
      position: absolute;
      width: 100%;
      height: 100%;
      color: ${(p) => p.$color || "var(--cl-product-1)"};
      font-weight: bold;
      transform: scale(0);
    }
  }
`;

/*





*/

const tooltipStyle = {
  backgroundColor: "var(--cl-bg)",
  color: "var(--cl-text)",
  border: "1px solid var(--cl-border)",
  borderRadius: "var(--radius-small)",
};
const tooltipItem = { backgroundColor: "var(--cl-bg)", color: "var(--cl-text)" };

export function ImmediatPurchases() {
  const filter = "?status=pending&sort=-createdAt,quantity";
  const [meta, setMeta] = useState({});
  const [purchases, setPurchases] = useState();
  const { data, isLoading } = useGetPurchasesFree(filter);

  useEffect(() => {
    data && setMeta(data.meta);
    data && setPurchases(data.data);
  }, [data]);

  return (
    <>
      {isLoading && <Spinner />}
      {!isLoading && !meta.length && <DisplayAltMessage message="No purchase Request available" />}

      {meta.length > 0 && purchases.map((purchase) => <PurchaseItem key={purchase.id} purchase={purchase} filter={filter} />)}
    </>
  );
}

export function Summary() {
  const [pendingPur, setPendingPur] = useState(0);
  const [pendingSup, setPendingSup] = useState(0);
  const [stockedOut, setStockedOut] = useState(0);
  const [curAccount, setCurAccount] = useState(0);

  const { data: pur } = useGetPurchasesFree(SUMMARY_FILTER_PURCHASE);
  const { data: sup } = useGetSuppliesFree(SUMMARY_FILTER_SUPPLIES);
  const { data: stock } = useGetProductsFree(SUMMARY_FILTER_PRODUCTS);
  const { data: wallet } = useGetWallet();

  useEffect(() => {
    pur && setPendingPur(pur.meta.length);
    sup && setPendingSup(sup.meta.length);
    stock && setStockedOut(stock.meta.length);
    wallet && setCurAccount(wallet.data.balance);
  }, [pur, sup, stock, wallet]);

  return (
    <SummaryContainer>
      <SummaryItem color="#1e8fff" title="pending purchase" value={pendingPur}>
        <MdOutlinePending />
      </SummaryItem>
      <SummaryItem color="#ff1e1e" title="low on stock" value={stockedOut} iconScale="0.5">
        <BsBoxes />
      </SummaryItem>
      <SummaryItem color="#e6cf00" title="pending supply" value={pendingSup}>
        <AiOutlineFieldTime />
      </SummaryItem>
      <SummaryItem color="#04da1d" title="current account" value={formatAmount(curAccount)} fontSize="1.6rem">
        <MdAttachMoney />
      </SummaryItem>
    </SummaryContainer>
  );
}

export function ProfitShareItem() {
  const [share, setShare] = useState([]);
  const [mainData, setMainData] = useState([]);
  const { data, isLoading } = useGetShares("?status=approved");

  useEffect(() => {
    data && setShare(data.data.map((d) => ({ ...d, name: cutString(d.name, 10) })));
    data && setMainData(data.data.map((d) => ({ ...d, name: `${d.name} (${d.sold})` })));
  }, [data]);

  return (
    <ShareItem title="Profit shares" data={share} datakey="name">
      <ResponsiveContainer width="100%">
        {isLoading && <Spinner />}

        {share.length > 0 && (
          <PieChart width="100%" height="100%">
            <Tooltip itemStyle={tooltipItem} contentStyle={tooltipStyle} separator=" : $" />

            <Pie data={mainData} dataKey="profit" nameKey="name" cx="50%" cy="50%" outerRadius={90} innerRadius={60} fill="color" paddingAngle={2}>
              {mainData.map((d) => (
                <Cell key={d.color} fill={d.color} stroke={d.color} />
              ))}
            </Pie>
          </PieChart>
        )}
      </ResponsiveContainer>
    </ShareItem>
  );
}

export function SalesShareItem() {
  const [share, setShare] = useState([]);
  const [mainData, setMainData] = useState([]);
  const { data, isLoading } = useGetShares("?status=approved");

  useEffect(() => {
    data && setShare(data.data.map((d) => ({ ...d, name: cutString(d.name, 10) })));
    data && setMainData(data.data.map((d) => ({ ...d, name: `${d.name} (${d.sold})` })));
  }, [data]);

  return (
    <ShareItem title="sales shares" data={share} datakey="name">
      <ResponsiveContainer width="100%">
        {isLoading && <Spinner />}
        {share.length > 0 && (
          <PieChart width="100%" height="100%">
            <Tooltip itemStyle={tooltipItem} contentStyle={tooltipStyle} separator=" : $" />

            <Pie data={mainData} dataKey="sales" nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="color">
              {mainData.map((d) => (
                <Cell key={d.name} fill={d.color} stroke={d.color} />
              ))}
            </Pie>
          </PieChart>
        )}
      </ResponsiveContainer>
    </ShareItem>
  );
}

export function Growth() {
  const [products, setProduts] = useState([]);
  const [data, setData] = useState([]);
  const [charts, setCharts] = useState([]);

  const { data: salesData, isLoading } = useGetSales("?status=approved");

  useEffect(() => {
    if (salesData) {
      const structured = new StructureDataForAreaChart(salesData.data);

      setProduts(structured.products);
      setData(structured.data);
    }
  }, [salesData]);

  function addNewChart(productId) {
    const included = charts.find((c) => c.id === productId);

    if (included) {
      const newCharts = charts.filter((c) => c.id !== productId);
      setCharts(newCharts);
      return;
    }

    const product = products.find((p) => p.id === productId);
    setCharts((cur) => [...cur, product]);
  }

  return (
    <div>
      <strong>Sales</strong>
      <div className="chart">
        <ResponsiveContainer>
          {isLoading && <Spinner />}
          {!isLoading && !data.length && <DisplayAltMessage message="No products available" />}

          {data.length > 0 && (
            <AreaChart width="100%" height="100%" data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                {products.length > 0 &&
                  products.map((prod) => (
                    <linearGradient key={prod.id} id={`gradient-${prod.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={prod.color} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={prod.color} stopOpacity={0} />
                    </linearGradient>
                  ))}

                <linearGradient id="gradient-sales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--cl-primary)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--cl-primary)" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis dataKey="date" />
              <YAxis unit="$" />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip contentStyle={tooltipStyle} itemStyle={tooltipItem} separator=" : $" />

              <Area type="monotone" dataKey="sales" stroke="var(--cl-primary)" fillOpacity={1} fill="url(#gradient-sales)" />

              {charts.length > 0 &&
                charts.map((prod) => (
                  <Area type="monotone" key={prod.name} dataKey={prod.name} stroke={prod.color} fillOpacity={1} fill={`url(#gradient-${prod.id})`} />
                ))}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="graphs">
        {products.length > 0 &&
          products.map((prod) => <GraphCheck key={prod.id} name={prod.name} onClick={() => addNewChart(prod.id)} id={prod.id} color={prod.color} />)}
      </div>
    </div>
  );
}

/*





*/
function SummaryItem({ children, color, title, value, iconScale, fontSize }) {
  return (
    <StyledSummaryItem $color={color} $iconScale={iconScale} $fontSize={fontSize}>
      <div className="icon">
        <span>{children}</span>
      </div>
      <div className="detail">
        <p>{title}</p>
        <strong>{value}</strong>
      </div>
    </StyledSummaryItem>
  );
}

function ShareItem({ children, data, datakey, title }) {
  return (
    <StyledShareItem>
      <div className="chart-container">
        <strong>{title}</strong>
        <div className="chart">{children}</div>
      </div>

      <div>
        {data.map((item, i) => (
          <ShareIndicator key={item[datakey]} name={item[datakey]} color={item.color} />
        ))}
      </div>
    </StyledShareItem>
  );
}
function ShareIndicator({ name, color }) {
  return (
    <StyledShareIndicator className="share-indicator" $color={color}>
      <span></span> {name}
    </StyledShareIndicator>
  );
}

function GraphCheck({ name, id, color, ...rest }) {
  return (
    <StyledGraphCheck $color={color}>
      <input type="checkbox" id={id} {...rest} />
      <div>
        <span>
          <FaCheck />
        </span>
      </div>
      <label htmlFor={id}>{name}</label>
    </StyledGraphCheck>
  );
}

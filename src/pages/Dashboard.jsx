import { AiOutlineFieldTime } from "react-icons/ai";
import { BsBoxes } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import { MdAttachMoney, MdOutlinePending } from "react-icons/md";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import styled from "styled-components";
import Table from "../context/Table";
import PurchaseItem from "../markups/PurchaseItem";

const StyledDashboard = styled.div`
  height: 20rem;
  overflow-y: auto;
  padding-right: 1rem;
`;
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
const SharesContainer = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 43.75em) {
    display: block;

    > * {
      width: 100%;
      margin-block: 1rem;
    }
  }

  > * {
    flex-basis: 50%;
  }
`;
const StyledShareItem = styled.div`
  width: 100%;
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
const GrowthContainer = styled.div`
  padding: 1.5rem;
  border-radius: var(--radius-normal);
  background-color: var(--cl-bg-white);
  margin-block: 3rem;
  overflow-x: auto;

  > div {
    min-width: 800px;

    strong {
      font-size: 2rem;
    }

    > *:not(:nth-child(2)) {
      margin-left: 2rem;
    }
  }

  .chart {
    height: 30rem;
    margin-block: 1rem;
  }

  .graphs {
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
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

const profitShare = [
  {
    name: "product A",
    value: 400,
    color: "#9E77ED",
  },
  {
    name: "product B",
    value: 300,
    color: "#F79009",
  },
  {
    name: "product C",
    value: 300,
    color: "#EE46BC",
  },
  {
    name: "product D",
    value: 200,
    color: "#F63D68",
  },
  {
    name: "product E",
    value: 278,
    color: "#6172F3",
  },
];
const growthData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function Dashboard() {
  return (
    <StyledDashboard>
      <SummaryContainer>
        <SummaryItem color="#1e8fff" title="pending request" value={24}>
          <MdOutlinePending />
        </SummaryItem>
        <SummaryItem color="#ff1e1e" title="out of stock" value={24} iconScale="0.5">
          <BsBoxes />
        </SummaryItem>
        <SummaryItem color="#e6cf00" title="pending supply" value={24}>
          <AiOutlineFieldTime />
        </SummaryItem>
        <SummaryItem color="#04da1d" title="current account" value="$2,702,278.00" fontSize="1.6rem">
          <MdAttachMoney />
        </SummaryItem>
      </SummaryContainer>

      <SharesContainer>
        <ShareItem title="Profit shares" data={profitShare} datakey="name">
          <ResponsiveContainer>
            <PieChart width="100%" height="100%">
              <Pie
                data={profitShare}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={60}
                fill="color"
                paddingAngle={2}
              >
                {profitShare.map((d) => (
                  <Cell key={d.color} fill={d.color} stroke={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ShareItem>

        <ShareItem title="sales shares" data={profitShare} datakey="name">
          <ResponsiveContainer>
            <PieChart width="100%" height="100%">
              <Pie data={profitShare} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} fill="color">
                {profitShare.map((d) => (
                  <Cell key={d.name} fill={d.color} stroke={d.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </ShareItem>
      </SharesContainer>

      <GrowthContainer>
        <div>
          <strong>Sales</strong>
          <div className="chart">
            <ResponsiveContainer>
              <AreaChart width="100%" height="100%" data={growthData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--cl-product-1)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--cl-product-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--cl-product-2)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--cl-product-2)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="var(--cl-product-1)" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="pv" stroke="var(--cl-product-2)" fillOpacity={1} fill="url(#colorPv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="graphs">
            <GraphCheck name="product 1" id="product-1" color="var(--cl-product-1)" checked={true} />
            <GraphCheck name="product 2" id="product-2" color="var(--cl-product-2)" checked={true} />
            <GraphCheck name="product 3" id="product-3" color="var(--cl-product-3)" />
            <GraphCheck name="product 4" id="product-4" color="var(--cl-product-4)" />
            <GraphCheck name="product 5" id="product-5" color="var(--cl-product-5)" />
          </div>
        </div>
      </GrowthContainer>

      <Table>
        <Table.Window>
          <strong style={{ fontSize: "2rem", padding: "1rem", marginBottom: "1rem" }}>Purchase Requests</strong>
          <Table.Head
            labels={["image", "name", "quantity", "unit price", "total price", "available", "-", "-"]}
            gridColumn="1fr 3fr 1fr 1fr 1fr 1fr 1fr 1fr"
          />

          <Table.Body>
            {Array.from({ length: 3 }).map((item, i) => (
              <PurchaseItem key={i} number={5} />
            ))}
            {Array.from({ length: 3 }).map((item, i) => (
              <PurchaseItem key={i + 3} number={1} />
            ))}
          </Table.Body>
        </Table.Window>
      </Table>
    </StyledDashboard>
  );
}

export default Dashboard;

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
function ShareIndicator({ name, color }) {
  return (
    <StyledShareIndicator className="share-indicator" $color={color}>
      <span></span> {name}
    </StyledShareIndicator>
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
          <ShareIndicator key={i} name={item[datakey]} color={item.color} />
        ))}
      </div>
    </StyledShareItem>
  );
}
function GraphCheck({ name, id, color, checked }) {
  return (
    <StyledGraphCheck $color={color}>
      <input type="checkbox" id={id} checked={checked} />
      <div>
        <span>
          <FaCheck />
        </span>
      </div>
      <label htmlFor={id}>{name}</label>
    </StyledGraphCheck>
  );
}

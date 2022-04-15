import { useEffect, useState } from "react";
import { ICompletedOrder } from "../../Interfaces/ICompletedOrder";
import { ILineItem } from "../../Interfaces/ILineItem";
import { toCurrency } from "../../Services/tools";
import SmallAgeBadge from "../SmallAgeBadge/SmallAgeBadge";
import "./OrderDetail.css";

type Props = {
  order: ICompletedOrder;
};

export default function OrderDetail({ order }: Props) {
  function getItemPrice(item: ILineItem): number {
    if (item) {
      return item.quantity * item.price;
    }
    return 0;
  }
  const [totalCost, setTotalCost] = useState<number>(0);
  useEffect(() => {
    var total = 0;
    if (order && order.lineItems && order.lineItems.length > 0) {
      for (var i = 0; i < order.lineItems.length; i++) {
        total += order.lineItems[i].quantity * order.lineItems[i].price;
      }
    }
    setTotalCost(total);
  }, [order]);
  if (order) {
    return (
      <div className="od__receipt">
        <div className="od__information">
          <div className="od__infoitem">
            <span className="od__infolabel">Order&nbsp;Number</span>
            <span className="od__info">{order.id}</span>
          </div>
          <div className="od__infoitem">
            <span className="od__infolabel">Email</span>
            <span className="od__info">{order.email}</span>
          </div>
          <div className="od__infoitem">
            <span className="od__infolabel">Items</span>
            <span className="od__info">{order.lineItems?.length}</span>
          </div>
          <div className="od__infoitem">
            <span className="od__infolabel">Total&nbsp;Price</span>
            <span className="od__info">{toCurrency(totalCost)}</span>
          </div>
          <div className="od__infoitem">
            <span className="od__infolabel">Payment&nbsp;Method</span>
            <span className="od__info">(Card ending 1259)</span>
          </div>
        </div>
        <div className="od__details">
          <div className="od__detailheader">Order Details</div>
          {order.lineItems && (
            <div className="od__detailcontainer">
              <div className="od__gridheader od__detailgrid">
                <span>&nbsp;</span>
                <span>Qty</span>
                <span>Item</span>
                <span className="od__pullright">Price</span>
              </div>
              {order.lineItems.map((x) => (
                <div className="od__gridrow od__detailgrid" key={x.id}>
                  <span>
                    <SmallAgeBadge ageRequired={x.ageRequired} />
                  </span>
                  <span>{x.quantity}</span>
                  <div className="od__truncate">
                    <span className="od__optional">
                      {x.product.vendor.name}
                    </span>{" "}
                    <span>{x.product.name}</span>
                  </div>
                  <span className="od__pullright">
                    {toCurrency(getItemPrice(x))}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

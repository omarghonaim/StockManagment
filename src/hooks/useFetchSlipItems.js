import { useState, useEffect } from "react";
import axiosInstance from "../Config/config";

function useFetchSlipItems(warehouse_id, receiving_slip_id) {
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [slipItems, setSlipItems] = useState([]);

  const getSlipItems = () => {
    if (!warehouse_id && !receiving_slip_id) {
      slipItems(null);
      return;
    }
    setIsLoadingItems(true);
    axiosInstance
      .post("receivingSlipItems/index", { warehouse_id, receiving_slip_id })
      .then((response) => {
        setIsLoadingItems(false);
        setSlipItems(response.data.data);
      })
      .catch(() => {
        setIsLoadingItems(false);
      });
  };

  const refresh = () => {
    if (!isLoadingItems) getSlipItems();
  };

  useEffect(() => {
    getSlipItems();
  }, [warehouse_id, receiving_slip_id]);

  return { slipItems, isLoadingItems, refresh };
}

export default useFetchSlipItems;

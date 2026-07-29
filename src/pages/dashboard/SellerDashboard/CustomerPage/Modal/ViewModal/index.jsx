// @ts-nocheck
import { useEffect } from "react";
import { Box } from "@mui/material";
import { CustomerHeader } from "./CustomerViewHeader";
import { CustomerStats } from "./CustomerStats";
import { CustomerTabs } from "./CustomerTab";
import { CustomerOverview } from "./CustomerOverview";
import { CustomerOrders } from "./CustomerOrder";
import { CustomerNotes } from "./CustomerNotes";
import { useCustomerView } from "./UseCustomerView";
import { ModalLayout } from "@/layouts";

/**
 * @param {Object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {import("../../lib").Customer | null} props.customer
 */
export default function CustomerViewModal({ open, onClose, customer }) {
  const {
    activeTab,
    setActiveTab,
    notes,
    setNotes,
    saved,
    handleSaveNotes,
    reset,
  } = useCustomerView({ customer });

  useEffect(() => {
    if (open) reset();
  }, [open]);

  if (!customer) return null;

  return (
    <ModalLayout
      open={open}
      onClose={onClose}
      round={12}
      py={0}
      px={0}
      overflowVisible={false}
      width={{ xs: "95%", sm: "85%", md: "620px", lg: "720px" }}
    >
      <CustomerHeader customer={customer} />
      <CustomerStats customer={customer} />
      <CustomerTabs activeTab={activeTab} onChange={setActiveTab} />

      <Box sx={{ px: 3, pb: 3, overflowY: "auto", maxHeight: "38vh" }}>
        {activeTab === "Overview" && <CustomerOverview customer={customer} />}
        {activeTab === "Orders" && <CustomerOrders customer={customer} />}
        {activeTab === "Notes" && (
          <CustomerNotes
            notes={notes}
            onChange={setNotes}
            onSave={handleSaveNotes}
            saved={saved}
          />
        )}
      </Box>
    </ModalLayout>
  );
}

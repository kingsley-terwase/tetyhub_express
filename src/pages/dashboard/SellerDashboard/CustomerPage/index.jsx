// @ts-nocheck
import { useState, useMemo } from "react";
import { Stack } from "@mui/material";
import { spacingTokens } from "@/lib/theme";
import { customers } from "./lib";
import { usePagination } from "@/lib/pagination";
import { CreateCustomerModal } from "./Modal/CreateCustomersModal";
import CustomerHeader from "./CustomerHeader";
import SegmentTabs from "./SegmentTabs";
import CustomerTable from "./CustomerTable";
import { EditCustomerModal } from "./Modal/EditCustomersModal";
import CustomerViewModal from "./Modal/ViewModal";
import { MessageCustomerModal } from "./Modal/MessageModal";

export default function CustomerPage() {
  const [selected, setSelected] = useState(/** @type {string[]} */ ([]));
  const [search, setSearch] = useState("");
  const [segment, setSegment] = useState("all");
  const [status, setStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [viewing, setViewing] = useState(/** @type {any} */ (null));
  const [messageOpen, setMessageOpen] = useState(false);
  const [savingCustomer, setSavingCustomer] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [activeCustomer, setActiveCustomer] = useState(
    /** @type {ActiveCustomer} */ (null),
  );

  const filtered = useMemo(
    () =>
      customers.filter((c) => {
        const matchSearch =
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.email.toLowerCase().includes(search.toLowerCase());
        const matchSegment = segment === "all" || c.segment === segment;
        const matchStatus = status === "all" || c.status === status;
        return matchSearch && matchSegment && matchStatus;
      }),
    [search, segment, status],
  );

  const pg = usePagination({ data: filtered, defaultPerPage: 5 });

  /** @param {string} id */
  const toggleOne = (id) =>
    setSelected((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id],
    );

  /** @param {any} row */
  const handleView = (row) => {
    setViewing(row);
    setViewOpen(true);
  };

  /** @param {import("./Modal/CreateCustomersModal/UseForm").CustomerForm} form */
  const handleSave = async (form) => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    console.log("new customer", form);
    setSaving(false);
    setModalOpen(false);
  };

  /** @param {import("./Modal/MessageModal/UseFormMessage").CustomerForm} form */
  const handleSaveCustomer = async (form) => {
    setSavingCustomer(true);
    await new Promise((r) => setTimeout(r, 800));
    console.log("new customer", form);
    setSavingCustomer(false);
    setCreateOpen(false);
  };

  /** @param {import("./Modal/MessageModal/UseFormMessage").MessageForm} form */
  const handleSendMessage = async (form) => {
    setSendingMessage(true);
    await new Promise((r) => setTimeout(r, 800));
    console.log("message sent", form, "to", activeCustomer);
    setSendingMessage(false);
    setMessageOpen(false);
    setActiveCustomer(null);
  };

  /** @param {{ name:string, email:string, avatar:string }} customer */
  const openMessage = (customer) => {
    setActiveCustomer(customer);
    setMessageOpen(true);
  };

  return (
    <Stack gap={spacingTokens.md}>
      <CustomerHeader
        count={filtered.length}
        onAdd={() => setModalOpen(true)}
      />

      <SegmentTabs
        segment={segment}
        setSegment={setSegment}
        resetPage={() => pg.setPage(1)}
      />

      <CustomerTable
        data={pg.paginated}
        total={filtered.length}
        selected={selected}
        toggleOne={toggleOne}
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        pg={pg}
        onView={handleView}
        onMail={() => setMessageOpen(true)}
        onEdit={() => setEditOpen(true)}
      />

      <CreateCustomerModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        loading={saving}
      />
      <EditCustomerModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
      />
      <CustomerViewModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        customer={viewing}
      />

      <MessageCustomerModal
        open={messageOpen}
        onClose={() => {
          setMessageOpen(false);
          setActiveCustomer(null);
        }}
        onSend={handleSendMessage}
        customer={activeCustomer}
        loading={sendingMessage}
      />
    </Stack>
  );
}

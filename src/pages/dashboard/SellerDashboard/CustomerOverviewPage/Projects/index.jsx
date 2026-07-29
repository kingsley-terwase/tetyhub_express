import { ActionButton } from "@/components/shared";
import { Checkbox, Chip, Table, TableBody, TableHead } from "@/components/ui";
import { TASK_STATUS_VARIANT } from "@/lib/data";
import { spacingTokens } from "@/lib/theme";
import { formatDueDate } from "@/helpers/date";
import {
  CalendarDateRegular,
  CircleRegular,
  CircleSmallFilled,
  DocumentLinkRegular,
  DocumentRegular,
  SquareRegular,
} from "@fluentui/react-icons";
import { Stack, TableCell, TableRow } from "@mui/material";

const rows = [
  {
    id: "#4YBJ6",
    subject: "Meeting with BMG",
    status: "to-do",
    due_date: "2025-02-19T09:00:00",
    link: "Landing Page",
  },
  {
    id: "#7KLM2",
    subject: "Review Design Mockups",
    status: "in-progress",
    due_date: "2025-02-21T14:00:00",
    link: "Design System",
  },
  {
    id: "#9QRT4",
    subject: "Send Invoice to Client",
    status: "done",
    due_date: "2025-02-16T11:30:00",
    link: "Billing",
  },
  {
    id: "#2WXZ8",
    subject: "Update API Documentation",
    status: "in-progress",
    due_date: "2025-02-24T10:00:00",
    link: "Docs",
  },
  {
    id: "#1ACD3",
    subject: "Onboard New Developer",
    status: "to-do",
    due_date: "2025-03-03T09:00:00",
    link: "HR Portal",
  },
  {
    id: "#5FGH9",
    subject: "Fix Auth Bug",
    status: "overdue",
    due_date: "2025-02-12T08:00:00",
    link: "Bug Tracker",
  },
  {
    id: "#8NOP7",
    subject: "Q3 Performance Review",
    status: "cancelled",
    due_date: "2025-09-10T14:00:00",
    link: "HR Portal",
  },
];

const columns = [
  { label: "", icon: SquareRegular },
  { label: "ID" },
  { label: "Project", icon: DocumentRegular },
  { label: "Status", icon: CircleRegular },
  { label: "Due Date", icon: CalendarDateRegular },
  { label: "Linked", icon: DocumentLinkRegular },
  { label: "Action", icon: CircleRegular },
];

export default function Projects() {
  return (
    <Table>
      <TableHead columns={columns}></TableHead>
      <TableBody loading={false} count={rows?.length} span={columns.length}>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>
              <Checkbox></Checkbox>
            </TableCell>
            <TableCell>{row.id}</TableCell>
            <TableCell>{row.subject}</TableCell>
            <TableCell>
              <Chip
                icon={<CircleSmallFilled />}
                label={row.status}
                color={TASK_STATUS_VARIANT[row.status]}
                variant="outlined"
              />
            </TableCell>
            <TableCell>{formatDueDate(row.due_date)}</TableCell>
            <TableCell>{row.link}</TableCell>
            <TableCell>
              <Stack direction="row" alignItems="center" gap={spacingTokens.md}>
                <ActionButton variation="edit" onClick={() => console.log("null")}></ActionButton>
                <ActionButton variation="delete" onClick={() => console.log("null")}></ActionButton>
              </Stack>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

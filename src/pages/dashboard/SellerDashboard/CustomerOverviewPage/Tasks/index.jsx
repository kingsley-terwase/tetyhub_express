import { Button, Tab, Tabs, Typography } from "@/components/ui";
import { spacingTokens } from "@/lib/theme";
import { useTab } from "@/lib/tab";
import { AddFilled } from "@fluentui/react-icons";
import { Stack } from "@mui/material";
import { tabs } from "./lib";
import { TaskMiniCard } from "@/components/feature";
import { useState } from "react";

const myTasksData = [
  {
    subject: "Finish UI for dashboard",
    completed: false,
    date: "2026-02-20", // Today
    time: "09:40",
    reminder: "18:30",
    onCheck: () => console.log("Checked: Finish UI"),
  },

  {
    subject: "Prepare backend API docs",
    completed: true,
    date: "2026-02-19", // Yesterday
    time: "14:00",
    onCheck: () => console.log("Checked: API docs"),
  },

  {
    subject: "Team standup meeting",
    completed: false,
    date: "2026-02-21", // Tomorrow
    time: "10:00",
    reminder: "7:18",
    onCheck: () => console.log("Checked: Standup"),
  },

  {
    subject: "Refactor auth flow",
    completed: false,
    date: "2026-03-05", // Thu, Mar 5
    time: "16:30",
    onCheck: () => console.log("Checked: Refactor auth"),
  },

  {
    subject: "Buy groceries",
    completed: true,
    date: "2026-03-05",
    reminder: "6:21",
    onCheck: () => console.log("Checked: Groceries"),
  },

  {
    subject: "Push hotfix to production",
    completed: false,
    time: "23:15", // no date (time-only case)
    onCheck: () => console.log("Checked: Hotfix"),
  },

  {
    subject: "Read neuroscience paper",
    completed: false,
    date: "2026-02-18", // older than yesterday
    onCheck: () => console.log("Checked: Paper"),
  },

  {
    subject: "Plan next sprint",
    completed: false,
    date: "Thu, Mar 5", // already formatted edge case
    reminder: "19:59",
    onCheck: () => console.log("Checked: Sprint plan"),
  },

  {
    subject: "Just a plain task with nothing",
    completed: false,
  },
];

const assignedTasksData = [
  {
    subject: "Finish UI for dashboard",
    assigneeName: "Sarah Kim",
    completed: false,
    date: "2026-02-20",
    time: "09:40",
    reminder: "18:30",
    onCheck: () => console.log("Checked: Finish UI"),
  },

  {
    subject: "Prepare backend API docs",
    assigneeName: "Daniel Okafor",
    completed: true,
    date: "2026-02-19",
    time: "14:00",
    onCheck: () => console.log("Checked: API docs"),
  },

  {
    subject: "Team standup meeting",
    assigneeName: "Mia Chen",
    completed: false,
    date: "2026-02-21",
    time: "10:00",
    reminder: "7:18",
    onCheck: () => console.log("Checked: Standup"),
  },

  {
    subject: "Refactor auth flow",
    assigneeName: "Alex Johnson",
    completed: false,
    date: "2026-03-05",
    time: "16:30",
    onCheck: () => console.log("Checked: Refactor auth"),
  },

  {
    subject: "Buy groceries",
    assigneeName: "Chinedu Adebayo",
    completed: true,
    date: "2026-03-05",
    reminder: "6:21",
    onCheck: () => console.log("Checked: Groceries"),
  },

  {
    subject: "Push hotfix to production",
    assigneeName: "Nina Patel",
    completed: false,
    time: "23:15",
    onCheck: () => console.log("Checked: Hotfix"),
  },

  {
    subject: "Read neuroscience paper",
    assigneeName: "Liam Carter",
    completed: false,
    date: "2026-02-18",
    onCheck: () => console.log("Checked: Paper"),
  },

  {
    subject: "Plan next sprint",
    assigneeName: "Fatima Hassan",
    completed: false,
    date: "Thu, Mar 5",
    reminder: "19:59",
    onCheck: () => console.log("Checked: Sprint plan"),
  },

  {
    subject: "Just a plain task with nothing",
    assigneeName: "Jay",
    completed: false,
  },
];

export default function Tasks() {
  const { tab, onChange } = useTab(1);

  const [myTasks, setMyTasks] = useState(myTasksData);
  const [assignedTasks, setAssignedTasks] = useState(assignedTasksData);

  function handleTabChange(/** @type {number} */ tab) {
    onChange(tab);
  }

  function toggleMyTask(/** @type {number} */ index) {
    setMyTasks((prev) =>
      prev.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task)),
    );
  }

  function toggleAssignedTask(/** @type {number} */ index) {
    setAssignedTasks((prev) =>
      prev.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task)),
    );
  }

  return (
    <Stack gap={spacingTokens.md}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h1" fontWeight={600}>
          Tasks
        </Typography>
        <Button startContent={<AddFilled />}>Create Task</Button>
      </Stack>

      <Tabs tabs={tabs} onChange={handleTabChange} active={tab} round={5}>
        {/* My Tasks */}
        <Tab tabKey={1} activeTab={tab}>
          <Stack gap={spacingTokens.sm}>
            {myTasks.map((task, index) => (
              <TaskMiniCard key={index} {...task} onCheck={() => toggleMyTask(index)} round={6} />
            ))}
          </Stack>
        </Tab>

        {/* Assigned Tasks */}
        <Tab tabKey={2} activeTab={tab}>
          <Stack gap={spacingTokens.sm}>
            {assignedTasks.map((task, index) => (
              <TaskMiniCard
                key={index}
                {...task}
                onCheck={() => toggleAssignedTask(index)}
                round={6}
              />
            ))}
          </Stack>
        </Tab>
      </Tabs>
    </Stack>
  );
}

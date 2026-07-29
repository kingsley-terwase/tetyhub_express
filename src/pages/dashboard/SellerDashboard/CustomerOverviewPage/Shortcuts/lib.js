import {
  DataPieRegular,
  PeopleTeamRegular,
  WrenchSettingsRegular,
  ProjectionScreenTextSparkleRegular,
  DocumentFolderRegular,
  FormRegular,
} from "@fluentui/react-icons";
export const shortcuts = [
  {
    label: "CRM",
    path: "",
    icon: PeopleTeamRegular,
    color: "#05970F",
  },
  { label: "Sales", path: "/crm", icon: DataPieRegular, color: "#0A62C7" },
  {
    label: "Projects",
    path: "/projects",
    icon: ProjectionScreenTextSparkleRegular,
    color: "#FF0004",
  },
  { label: "Files", color: "#2C3891", path: "/files", icon: DocumentFolderRegular },
  { label: "Forms", color: "#3B009D", path: "/forms", icon: FormRegular },
  { label: "Automation", color: "#F1592A", path: "/automation", icon: WrenchSettingsRegular },
];

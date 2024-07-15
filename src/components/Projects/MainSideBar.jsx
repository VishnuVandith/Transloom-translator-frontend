import { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

import AllProjects from "./AllProjects";
import PlanSelection from "./PlanSelection";
import ChangePassword from "./ChangePassword";

function MainSideBar() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return <AllProjects />;
      case "plan-selection":
        return <PlanSelection />;
      case "current-plan":
        return <PlanSelection />;
      case "profile":
        return <AllProjects />;
      case "settings":
        return <ChangePassword />;
      default:
        return <AllProjects />;
    }
  };

  return (
    <div className="flex h-screen">
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Dashboard
          </Typography>
        </div>
        <List>
          <ListItem onClick={() => setActiveItem("dashboard")}>
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            Projects
          </ListItem>
          <ListItem onClick={() => setActiveItem("plan-selection")}>
            <ListItemPrefix>
              <ShoppingBagIcon className="h-5 w-5" />
            </ListItemPrefix>
            Current Plan
          </ListItem>
          <ListItem onClick={() => setActiveItem("current-plan")}>
            <ListItemPrefix>
              <InboxIcon className="h-5 w-5" />
            </ListItemPrefix>
            Users
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem onClick={() => setActiveItem("profile")}>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Support
          </ListItem>
          <ListItem onClick={() => setActiveItem("settings")}>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
      <div className="flex-grow p-6 overflow-auto">
        <div className="bg-white p-6 rounded shadow">{renderContent()}</div>
      </div>
    </div>
  );
}

export default MainSideBar;

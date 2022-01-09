import React from "react";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import { Route, Switch } from "react-router-dom";
import Register from "./account/register/Register";
import AssignTask from "./task/AssignTask";
import Profile from "./user/Profile";
import TaskList from "./task/TaskList";
import Calen from "./calendar/Calen";
import Settings from "../pages/Settings";
function Routes() {
  return (
    <div>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/customers" component={Customers} />
        <Route exact path="/create-user" component={Register} />
        <Route exact path="/assign-task" component={AssignTask} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/task-list" component={TaskList} />
        <Route exact path="/calendar" component={Calen} />
        <Route exact path="/settings" component={Settings} />
      </Switch>
    </div>
  );
}

export default Routes;

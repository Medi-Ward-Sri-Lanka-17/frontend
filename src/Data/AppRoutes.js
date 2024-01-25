import AddWardDetails from '../Pages/AddWardDetails/AddWardDetails'
import LeaveApprove from '../Pages/LeaveApprove/LeaveApprove'
import Login from '../Pages/LoginPage/Login'
import AddNews from '../Pages/News/AddNews'
import ViewNews from '../Pages/News/ViewNews'
import RequestLeave from '../Pages/RequestLeave/RequestLeave'
import Sheduling from '../Pages/Scheduling/Sheduling'
import ViewSchedule from '../Pages/ViewSchedule/ViewSchedule'
import ViewWardDetails from '../Pages/ViewWardDetails/ViewWardDetails'

export const AppRoutes = {
  // Home page routes
  home: { path: '/home', component: Login },

  // Scheduling related routes
  scheduling: { path: '/scheduling/add', component: Sheduling },
  scheduling_view: { path: '/scheduling/view', component: ViewSchedule },

  // Leave related routes
  leave_request: { path: '/leave/request', component: RequestLeave },
  leave_approve: { path: '/leave/approve', component: LeaveApprove },

  // Ward details related routes
  add_ward_details: { path: '/ward_details/add', component: AddWardDetails },
  view_ward_details: { path: '/ward_details/view', component: ViewWardDetails },

  // News Section
  add_news: { path: '/news/add', component: AddNews },
  view_news: { path: '/news/view', component: ViewNews },
}

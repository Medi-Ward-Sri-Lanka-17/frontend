import CreateSchedul from '../Pages/DutyScheduling/CreateSchedul'
import ViewSchedule from '../Pages/DutyScheduling/ViewSchedule'
import HomePage from '../Pages/HomePage/HomePage'
import RequestLeave from '../Pages/LeaveManagement/RequestLeave'
import LeaveApprove from '../Pages/LeaveManagement/LeaveApprove'
import AddWardDetails from '../Pages/WardDetails/AddWardDetails'
import ViewWardDetails from '../Pages/WardDetails/ViewWardDetails'
import AddNews from '../Pages/News/AddNews'
import ViewNews from '../Pages/News/ViewNews'
import Profile from '../Pages/Profile/Profile'
import Login from '../Pages/LoginPage/Login'
import LeaveMoreDetails from '../Pages/LeaveManagement/LeaveMoreDetails'
import AdminPanel from '../Pages/Admin/AdminPanel'
import AddStaff from '../Pages/Admin/StaffManagement'
import MatronManagement from '../Pages/Admin/MatronManagement'
import WardManagement from '../Pages/Admin/WardManagement'
import NewsManagement from '../Pages/Admin/NewsManagement'
import WardManagementMore from '../Pages/Admin/WardManagementMore'

export const AppRoutes = {
  // loginpath: { path: '/login', component: <Login /> },
  // login: { path: '/', component: <Login /> },
  // Home page routes
  home: { path: '/home', component: <HomePage /> },

  // Scheduling related routes
  Create_Schedule: { path: '/scheduling/create', component: <CreateSchedul /> },
  scheduling_view: { path: '/scheduling/view', component: <ViewSchedule /> },

  // Leave related routes
  leave_request: { path: '/leave/request', component: <RequestLeave /> },
  leave_approve: { path: '/leave/approve', component: <LeaveApprove /> },
  leave_more_details: {
    path: '/leave/approve/:leaveId',
    component: <LeaveMoreDetails />,
  },

  // Ward details related routes
  add_ward_details: {
    path: '/ward_details/add',
    component: <AddWardDetails />,
  },
  view_ward_details: {
    path: '/ward_details/view',
    component: <ViewWardDetails />,
  },

  // News Section
  add_news: { path: '/news/add', component: <AddNews /> },
  view_news: { path: '/news/view', component: <ViewNews /> },

  //Prpfile
  profile: { path: '/profile', component: <Profile /> },

  //Admin Panel
  Staff_Admin: { path: '/admin/staff', component: <AddStaff /> },
  Matron_Admin: { path: '/admin/matron', component: <MatronManagement /> },
  Ward_Admin: { path: '/admin/ward', component: <WardManagement /> },
  News_Admin: { path: '/admin/news', component: <NewsManagement /> },
  Ward_More_Admin: {
    path: '/admin/ward/:wardNo',
    component: <WardManagementMore />,
  },
}

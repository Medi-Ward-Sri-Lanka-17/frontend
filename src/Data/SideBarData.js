import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded'
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded'
import VaccinesRoundedIcon from '@mui/icons-material/VaccinesRounded'
import FeedRoundedIcon from '@mui/icons-material/FeedRounded'
// import { AppRoutes as routes } from './AppRoutes.js'

export const menus = [
  {
    name: 'Home',
    icon: <HomeRoundedIcon />,
    // path: routes.home.path,
    // component: routes.home.component,
  },
  {
    name: 'Duty Schedule',
    icon: <EventNoteRoundedIcon />,
    subMenu: [
      {
        name: 'Create Schedule',
        // path: routes.scheduling.path,
        // component: routes.scheduling.component,
      },
      {
        name: 'View Schedule',
        // path: routes.scheduling_view.path,
        // component: routes.scheduling_view.component,
      },
    ],
  },
  {
    name: 'Leave Management',
    icon: <ManageAccountsRoundedIcon />,
    subMenu: [
      {
        name: 'Leave Request',
        // path: routes.leave_request.path,
        // component: routes.leave_request.component,
      },
      {
        name: 'Leave Approve',
        // path: routes.leave_approve.path,
        // component: routes.leave_approve.component,
      },
    ],
  },
  {
    name: 'Ward Details',
    icon: <VaccinesRoundedIcon />,
    subMenu: [
      {
        name: 'Add Ward Details',
        // path: routes.add_ward_details.path,
        // component: routes.add_ward_details.component,
      },
      {
        name: 'View Ward Details',
        // path: routes.view_ward_details.path,
        // component: routes.view_ward_details.component,
      },
    ],
  },
  {
    name: 'News',
    icon: <FeedRoundedIcon />,
    subMenu: [
      {
        name: 'Add News',
        // // path: routes.add_news.path,
        // component: routes.add_news.component,
      },
      {
        name: 'News',
        // path: routes.view_news.path,
        // component: routes.view_news.component,
      },
    ],
  },
]

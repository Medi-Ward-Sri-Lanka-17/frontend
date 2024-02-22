import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import EventNoteRoundedIcon from '@mui/icons-material/EventNoteRounded'
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded'
import VaccinesRoundedIcon from '@mui/icons-material/VaccinesRounded'
import FeedRoundedIcon from '@mui/icons-material/FeedRounded'
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded'
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded'
// import { AppRoutes as routes } from './AppRoutes'

export const menus = [
  {
    name: 'Home',
    icon: <HomeRoundedIcon />,
    path: '/home',
  },
  {
    name: 'Duty Schedule',
    icon: <EventNoteRoundedIcon />,
    subMenu: [
      {
        name: 'Create Schedule',
        path: '/scheduling/create',
      },
      {
        name: 'View Schedule',
        path: '/scheduling/view',
      },
    ],
  },
  {
    name: 'Leave Management',
    icon: <ManageAccountsRoundedIcon />,
    subMenu: [
      {
        name: 'Leave Request',
        path: '/leave/request',
      },
      {
        name: 'Leave Approve',
        path: '/leave/approve',
      },
    ],
  },
  {
    name: 'Ward Details',
    icon: <VaccinesRoundedIcon />,
    subMenu: [
      {
        name: 'Add Ward Details',
        path: '/ward_details/add',
      },
      {
        name: 'View Ward Details',
        path: '/ward_details/view',
      },
    ],
  },
  {
    name: 'News',
    icon: <FeedRoundedIcon />,
    subMenu: [
      {
        name: 'Add News',
        path: '/news/add',
      },
      {
        name: 'News',
        path: '/news/view',
      },
    ],
  },
]

export const menusForAdmin = [
  {
    name: 'Home',
    icon: <HomeRoundedIcon />,
    path: '/admin',
  },
  {
    name: 'Staff Management',
    icon: <ManageAccountsRoundedIcon />,
    path: '/admin/staff',
  },
  {
    name: 'Matrons Management',
    icon: <AdminPanelSettingsRoundedIcon />,
    path: '/admin/matron',
  },
  {
    name: 'Ward Management',
    icon: <LocalHospitalRoundedIcon />,
    path: '/admin/ward',
  },
  {
    name: 'News Management',
    icon: <FeedRoundedIcon />,
    path: '/admin/news',
  },
]

import { IBasicInfoData } from '@type/menu/basicInfoData'

export const initialMenuManagementSteps = [
  {
    title: 'Basic Information',
    active: true,
    completed: false,
  },
  {
    title: 'Menu Architecture Setting',
    active: false,
    completed: false,
  },
  {
    title: 'Authority Setting',
    active: false,
    completed: false,
  },
]

export const initialBasicInformation: IBasicInfoData = {
  navigationLocation: '',
  menuDepth: '',
  system: '',
  menuName: '',
  menuURL: '',
  icon: {
    default: null,
    hover: null,
    active: null,
  },
}

export const pageTitleList = {
  add: { admin: ['Admin Menu', 'Add Admin Menu'], user: ['User Menu', 'Add User Menu'] },
  edit: {
    admin: ['Admin Menu', 'Edit Admin Menu'],
    user: ['User Menu', 'Edit User Menu'],
  },
}

export const ColumnData = {
  gnb: {
    icon: { title: 'Icon', colStyle: 'grid1_5' },
    menuName: { title: 'Menu Name', colStyle: 'grid4' },
    menuRoleMap: { title: 'Authority', colStyle: 'grid16_5 flex1' },
    menuUpdateDate: { title: 'Last Update Date', colStyle: 'grid3' },
  },
  lnb: {
    icon: { title: 'Icon', colStyle: 'grid1_5' },
    menuName: { title: 'Menu Name', colStyle: 'grid2_1 flex1' },
    menuUpdateDate: { title: 'Last Update Date', colStyle: 'grid3' },
  },
}

export const initialMenuLocation = {
  menuParentNum: 0,
  menuDepth: 0,
  menuSortNum: 0,
}

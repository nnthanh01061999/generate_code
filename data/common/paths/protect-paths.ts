import { DROPDOWN_CREATE, DROPDOWN_DELETE, DROPDOWN_UPDATE } from '@/data/common/dropdown';

export const DASHBOARD_PATH = '/dashboard';
export const CHOOSE_SUBSECTION_PATH = '/subsection';
export const CHART_PATH = '/chart';
export const RECHART_PATH = '/chart/rechart';
export const PERMISSION_PATH = '/permission';
export const MENU_PATH = '/menu';
export const WELCOME_PATH = '/welcome';
export const CLIENT_MENU_PERMISSION_PATH = '/client-menu-permission';
export const PERMISSION_SETTING_PATH = '/permission-setting';
export const GROUP_MENU_PERMISSION_PATH = '/group-menu-permission';
export const USER_MENU_PERMISSION_PATH = '/user-menu-permission';
export const GROUP_USER_PATH = '/group-user';
export const USER_PATH = '/user';
export const UNIT_PATH = '/unit';
export const ROLE_USER_UNIT_PATH = '/role-user-unit';
export const ROLE_USER_GROUP_PATH = '/role-user-group';
export const ORGANIZATION_PATH = '/organization';

export const protectPaths = {
    [DASHBOARD_PATH]: {
        title: 'Dashboard',
        action: {},
    },
    [CHOOSE_SUBSECTION_PATH]: {
        title: 'ChooseSubSection',
        action: {},
    },
    [CHART_PATH]: {
        title: 'Chart',
        action: {},
    },
    [RECHART_PATH]: {
        title: 'Rechart',
        action: {},
    },
    [PERMISSION_PATH]: {
        title: 'Permission',
        action: {},
    },
    [MENU_PATH]: {
        title: 'Menu',
        action: {
            [DROPDOWN_CREATE]: 2,
            [DROPDOWN_UPDATE]: 3,
        },
    },
    [WELCOME_PATH]: {
        title: 'Welcome',
        action: {},
    },
    [CLIENT_MENU_PERMISSION_PATH]: {
        title: 'ClientMenuPermission',
        action: {
            [DROPDOWN_UPDATE]: 3,
        },
    },
    [PERMISSION_SETTING_PATH]: {
        title: 'PermissionSetting',
        action: {
            [DROPDOWN_UPDATE]: undefined,
        },
    },
    [GROUP_MENU_PERMISSION_PATH]: {
        title: 'GroupMenuPermission',
        action: {
            [DROPDOWN_UPDATE]: 3,
        },
    },
    [USER_MENU_PERMISSION_PATH]: {
        title: 'UserMenuPermission',
        action: {
            [DROPDOWN_UPDATE]: 3,
        },
    },
    [GROUP_USER_PATH]: {
        title: 'GroupUser',
        action: {
            [DROPDOWN_CREATE]: 2,
            [DROPDOWN_UPDATE]: 3,
            [DROPDOWN_DELETE]: 4,
        },
    },
    [USER_PATH]: {
        title: 'User',
        action: {
            [DROPDOWN_CREATE]: 2,
            [DROPDOWN_UPDATE]: 3,
            [DROPDOWN_DELETE]: 4,
        },
    },
    [UNIT_PATH]: {
        title: 'Unit',
        action: {
            [DROPDOWN_CREATE]: 2,
            [DROPDOWN_UPDATE]: 3,
            [DROPDOWN_DELETE]: 4,
        },
    },
    [ROLE_USER_UNIT_PATH]: {
        title: 'RoleUserUnit',
        action: {
            giant_user: 6,
            giant_unit: 3,
        },
    },
    [ROLE_USER_GROUP_PATH]: {
        title: 'RoleUserGroup',
        action: {
            giant_user: 6,
            giant_group: 3,
        },
    },
    [ORGANIZATION_PATH]: {
        title: 'Origanization',
        action: {
            [DROPDOWN_CREATE]: 2,
            [DROPDOWN_UPDATE]: 3,
            [DROPDOWN_DELETE]: 4,
        },
    },
};

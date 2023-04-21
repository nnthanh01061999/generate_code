export interface ISubsectionAction {
    menu_id: number;
    line_id: number;
    name: string;
    name2: string;
    bit_index: number;
    is_access: boolean;
    is_default: boolean;
}
export interface ISubsection {
    menu_id: number;
    parent_menu_id: number;
    menu_name: string;
    menu_icon: string;
    menu_color: string;
    patterns: string;
    action: string;
    actions: ISubsectionAction[];
    is_visible: boolean;
}

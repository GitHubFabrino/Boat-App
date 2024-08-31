/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)/BottomTab/AddProject` | `/(tabs)/BottomTab/ProgressItem` | `/(tabs)/BottomTab/Project.Interface` | `/(tabs)/BottomTab/ProjectDetail` | `/(tabs)/BottomTab/Screen1` | `/(tabs)/BottomTab/Screen2` | `/(tabs)/BottomTab/TabScreens` | `/(tabs)/BottomTab/components/Dimension` | `/(tabs)/BottomTab/components/Materiaux` | `/(tabs)/BottomTab/components/Materiel` | `/(tabs)/BottomTab/components/ProjectItem` | `/(tabs)/BottomTab/components/Tache` | `/(tabs)/BottomTab/dataNewProject` | `/(tabs)/BottomTab/service` | `/(tabs)/BottomTab/styleScreen/styleAddProject` | `/(tabs)/BottomTab/styleScreen/styleDetailScreen` | `/(tabs)/BottomTab/styleScreen/styleScreen1` | `/(tabs)/BottomTab/styleScreen/styleScreen2` | `/(tabs)/BottomTab/types` | `/(tabs)/Drawer/CustomDrawer` | `/(tabs)/Drawer/DrawerScreen` | `/(tabs)/Drawer/HelpScreen` | `/(tabs)/Drawer/SettingScreen` | `/(tabs)/Drawer/TeamScreen` | `/(tabs)/Drawer/typeScreen1` | `/(tabs)/Drawer/typesDrawer` | `/BottomTab/AddProject` | `/BottomTab/ProgressItem` | `/BottomTab/Project.Interface` | `/BottomTab/ProjectDetail` | `/BottomTab/Screen1` | `/BottomTab/Screen2` | `/BottomTab/TabScreens` | `/BottomTab/components/Dimension` | `/BottomTab/components/Materiaux` | `/BottomTab/components/Materiel` | `/BottomTab/components/ProjectItem` | `/BottomTab/components/Tache` | `/BottomTab/dataNewProject` | `/BottomTab/service` | `/BottomTab/styleScreen/styleAddProject` | `/BottomTab/styleScreen/styleDetailScreen` | `/BottomTab/styleScreen/styleScreen1` | `/BottomTab/styleScreen/styleScreen2` | `/BottomTab/types` | `/Drawer/CustomDrawer` | `/Drawer/DrawerScreen` | `/Drawer/HelpScreen` | `/Drawer/SettingScreen` | `/Drawer/TeamScreen` | `/Drawer/typeScreen1` | `/Drawer/typesDrawer` | `/_sitemap` | `/detail` | `/singUpScreen`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}

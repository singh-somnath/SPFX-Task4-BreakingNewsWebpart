import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';
export interface IBreakingNewsProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  title: string;
  displayMode:DisplayMode;
  context:WebPartContext;
  updateProperty: (value: string) => void;
}

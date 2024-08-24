import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import * as strings from 'AllBreakingNewsWebPartStrings';
import AllBreakingNews from './components/AllBreakingNews';
import { IAllBreakingNewsProps } from './components/IAllBreakingNewsProps';
import { WebPartContext } from '@microsoft/sp-webpart-base';
export interface IAllBreakingNewsWebPartProps {
  description: string;
  context:WebPartContext;
}

export default class AllBreakingNewsWebPart extends BaseClientSideWebPart<IAllBreakingNewsWebPartProps> {



  public render(): void {
    const element: React.ReactElement<IAllBreakingNewsProps> = React.createElement(
      AllBreakingNews,
      {
        description: this.properties.description,
        context:this.context
        
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}

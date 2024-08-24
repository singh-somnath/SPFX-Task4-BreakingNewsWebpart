// MyDialog.js
import * as React from 'react';
import { Dialog, DialogFooter, DialogType } from '@fluentui/react/lib/Dialog';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Stack, ComboBox, IComboBox, IComboBoxOption, TextField } from '@fluentui/react';
import { ModernTaxonomyPicker } from "@pnp/spfx-controls-react";
import { getSP } from "./pnpjs-config";
import { ITermInfo } from "@pnp/spfx-controls-react/node_modules/@pnp/sp/taxonomy/";
import { WebPartContext } from '@microsoft/sp-webpart-base';
//import styles from './BreakingNews.module.scss';
interface BreakingNewsDialogProps {
  isVisible: boolean;
  onDismiss: (newsData: string) => void;
  context: WebPartContext;
}

const BreakingNewsDialog: React.FC<BreakingNewsDialogProps> = ({ isVisible, onDismiss, context }) => {
  const [selectedResponseName, setSelectedResponseName] = React.useState<string | undefined>(undefined);
  const [responseNameOptions, setResponseNameOptions] = React.useState<IComboBoxOption[]>([]);
  const [selectedRegion, setSelectedRegion] = React.useState<ITermInfo[]>([]);
  const [selectedCountry, setSelectedCountry] = React.useState<ITermInfo[]>([]);
  const onResponseTextChange = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string): void => {

 

    if (!option && value && responseNameOptions.filter(o => o.key === value).length === 0) {
      setResponseNameOptions(prevOptions => [...prevOptions, { key: value, text: value }]);
    }
    setSelectedResponseName(value);
  }

  const handleSubmittedData = ():void => {
    onDismiss("");
  };
  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Breaking News',
    subText: 'Please enter breaking news details',
  };

  interface ISPListCategory {
    Id: string;
    Title: string;
  }
  class ClassCategory {
    public Title: string;
    public Id: string;
    constructor(item: ISPListCategory) {
      this.Title = item.Title;
      this.Id = item.Id
    }
  }
  interface ISPListCategory {
    Id: string;
    Title: string;
  }


  const _getResponseNameData = async (): Promise<void> => {
    const sp = getSP();
    try {
      const response = await sp.web.lists
        .getByTitle("Response Tracker") // Access the list by title
        .items // Access the items collection
        .select("Title") // Select specific fields
        .filter(
          "ContentType ne 'Response Re-declaration (for closed responses)' and ContentType ne 'Response Re-declaration (for active responses)' and ContentType ne 'Response Undeclaration'"
        )(); // Await here
  
      const responseCollection = response.map((item: ISPListCategory) => new ClassCategory(item));
      const uniqueTitlesSet = new Set<string>();
  
      // Populate the Set with titles from the responseCollection
      responseCollection.forEach((response: ClassCategory) => {
        uniqueTitlesSet.add(response.Title);
      });
      const uniqueTitlesArray: string[] = [];
      uniqueTitlesSet.forEach((title) => {
        if (title) {
          uniqueTitlesArray.push(title);
        }
      });
  
      // Map the array to the desired options format
      const options = uniqueTitlesArray.map((response: string) => {
        return {
          key: response,
          text: response,
        };
      });
  
      // Update the state with new options
      setResponseNameOptions((prevOptions) => [...prevOptions, ...options]);
    } catch (error) {
      console.error("Error fetching response name data:", error); // Enhanced error handling
    }
  };
  
  

  React.useEffect(() => {

    _getResponseNameData().then(() => {
      // Optionally handle success
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
  }, []);

  const onRegionPickerChange = (terms: ITermInfo[]): void => {
    setSelectedRegion(terms);
  }
  const onCountryPickerChange = (terms: ITermInfo[]): void => {
    setSelectedCountry(terms);
  }
  return (
    <Dialog
      hidden={!isVisible}
     // onDismiss={onDismiss}
      dialogContentProps={dialogContentProps}
      modalProps={{
        isBlocking: true,
        //className:styles.breakingNewsDialogMain,
        styles: {
          main: {
            selectors: {
              ['@media (min-width: 480px)']: {
                width: 450,
                minWidth: 450,
                maxWidth: '1000px'
              }
            }
          }
        },
      }}
    >
      <Stack horizontal={false}
        tokens={{ childrenGap: 5 }}
        styles={{ root: { width: '100%' } }}>
        <ComboBox id="responseName"
          autoComplete="on"
          allowFreeform
          label="Response Name"
          placeholder="Type response name"
          onChange={onResponseTextChange}
          selectedKey={selectedResponseName}
          options={responseNameOptions}
          multiSelect={false}
        />
        <ModernTaxonomyPicker allowMultipleSelections={true}
          key={selectedRegion?.length ? selectedRegion?.[0].id : ""}
          termSetId="dbe3bc25-e892-49d0-a3db-4881907e2aea"
          isPathRendered
          panelTitle="Select Region"
          placeHolder='All'
          label="Region"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          context={context as any}
          onChange={onRegionPickerChange}
          initialValues={selectedRegion}
          allowSelectingChildren={false}
        />
        <ModernTaxonomyPicker allowMultipleSelections={true}
          key={selectedCountry?.length ? selectedCountry?.[0].id : ""}
          termSetId="dbe3bc25-e892-49d0-a3db-4881907e2aea"
          panelTitle="Select Country"
          placeHolder='All'
          label="Country"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          context={context as any}
          onChange={onCountryPickerChange}
          initialValues={selectedCountry}
          allowSelectingChildren={true}
        />
        <TextField label="Description" multiline rows={6} />
      </Stack>
      <DialogFooter>
        <PrimaryButton onClick={handleSubmittedData} text="OK" />
        
      </DialogFooter>
    </Dialog>
  );
};

export { BreakingNewsDialog };

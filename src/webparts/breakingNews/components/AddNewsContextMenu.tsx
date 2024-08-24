import * as React from 'react';
import {
  Icon
} from '@fluentui/react';
import { Stack, IButton } from '@fluentui/react';
import calloutStyles from './AddNewsContextMenu.module.scss';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { IContextualMenuProps } from '@fluentui/react/lib/ContextualMenu';

import { useEffect, useRef, useState } from 'react';
import { getSP } from './pnpjs-config';
interface AddNewsContextMenuProps {
  getSelectedValue: (value: string) => void;
  currentContext  :WebPartContext;
}
import {checkUserInPeopleOrGroupColumn} from './checkUserInPeopleOrGroupColumn';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ISiteUserInfo } from '@pnp/sp/site-users';

const AddNewsContextMenu: React.FunctionComponent<AddNewsContextMenuProps> = (props) => {
  
  const [menuProps,setMenuProps] = useState<IContextualMenuProps>({
                                      shouldFocusOnMount: true,
                                      shouldFocusOnContainer: true,
                                      items: [
                                        { key: 'DPRT', text: 'Download Press Release Template', onClick: (event, item) => handleSelection(item?.key || '') },
                                        { key: 'SEA', text: 'Share An Executive Alert', onClick: (event, item) => handleSelection(item?.key || '') }
                                      ]
                                    });
  const sp = getSP();
  
  const checkUserPermission = async () :Promise<boolean>=> {
    let isUSerRegionalHEADirector = false;
    let isUSerRegionalCommsLeader  = false;
    let isUSerDistributionLists  = false;
    try {
      const currentUser : ISiteUserInfo = await sp.web.currentUser();        
      console.log(currentUser,"  ",currentUser);

      isUSerRegionalHEADirector = await checkUserInPeopleOrGroupColumn(props.currentContext,'Regional Offices','wvi_RegionalHEADirector',currentUser);
      console.log("List of listItemsRegionalHEADirector ",isUSerRegionalHEADirector );

      if(!isUSerRegionalHEADirector){
          isUSerRegionalCommsLeader = await checkUserInPeopleOrGroupColumn(props.currentContext,'Regional Offices','wvi_RegionalComms',currentUser,false,true); 
          console.log("List of listItemsRegionalComms ",isUSerRegionalCommsLeader );
      }

      if(!isUSerRegionalCommsLeader){
          isUSerDistributionLists = await checkUserInPeopleOrGroupColumn(props.currentContext,'Distribution Lists','wvi_EmailAddresses',currentUser,true,true); 
          console.log("List of listItemsDistributionLists ",isUSerDistributionLists );
      }
      //console.log("Add News Status ", isUSerRegionalHEADirector || isUSerRegionalCommsLeader || isUSerDistributionLists);     
     
      }catch (error) {
      console.error("Error fetching user permissions", error);
    }
    return isUSerRegionalHEADirector || isUSerRegionalCommsLeader || isUSerDistributionLists;          
  };

  useEffect(() => {
   
    checkUserPermission().then((res:Boolean)=>{
        if(res){
          setMenuProps({
            shouldFocusOnMount: true,
            shouldFocusOnContainer: true,
            items: [
              { key: 'ABN', text: 'Add Breaking News',  onClick: (event, item) => handleSelection(item?.key || '') },
              { key: 'DPRT', text: 'Download Press Release Template', onClick: (event, item) => handleSelection(item?.key || '') },
              { key: 'SEA', text: 'Share An Executive Alert', onClick: (event, item) => handleSelection(item?.key || '') }
            ]
          });
        }  
    });
  },[]);
  
  const handleSelection = (selectedValue:string):void => {
    props.getSelectedValue(selectedValue);
  };

  const defaultButtonRef = useRef<IButton | null>(null);

  const handleAddButtonClick = ():void => {
    if (defaultButtonRef.current) {
      defaultButtonRef.current.openMenu();
    }
  };




  return (
    <>
      <button className={calloutStyles.calloutAddButton}>
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }} onClick={handleAddButtonClick}>
          <Icon iconName="CalculatorAddition" />
          <DefaultButton componentRef={defaultButtonRef} className={calloutStyles.calloutAddButton} text="Add" persistMenu menuProps={menuProps}/>
        </Stack>
      </button>


    </>
  );
};
export {AddNewsContextMenu};
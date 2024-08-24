import * as React from 'react';
import {
  Icon
} from '@fluentui/react';
import { Stack, IButton } from '@fluentui/react';
import calloutStyles from './AddNewsContextMenu.module.scss';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { IContextualMenuProps } from '@fluentui/react/lib/ContextualMenu';
import { useConst } from '@fluentui/react-hooks';
import { useRef } from 'react';
interface AddNewsContextMenuProps {
  getSelectedValue: (value: string) => void;
}
const AddNewsContextMenu: React.FunctionComponent<AddNewsContextMenuProps> = (props) => {
  const handleSelection = (selectedValue:string):void => {
    props.getSelectedValue(selectedValue);
  };
  const menuProps = useConst<IContextualMenuProps>(() => ({
    shouldFocusOnMount: true,
    shouldFocusOnContainer: true,
    items: [
      { key: 'ABN', text: 'Add Breaking News', onClick: (event, item) => handleSelection(item?.key || '') },
      { key: 'DPRT', text: 'Download Press Release Template', onClick: (event, item) => handleSelection(item?.key || '') },
      { key: 'SEA', text: 'Share An Executive Alert', onClick: (event, item) => handleSelection(item?.key || '') }
    ],
  }));

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
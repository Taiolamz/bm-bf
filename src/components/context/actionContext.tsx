import { createContext, useState } from "react";

const ActionContext = createContext<{
  moreSideItems: boolean;
  moreSideItemsFunc: (param: any) => void;
}>({
  moreSideItems: true,
  moreSideItemsFunc: (param) => {},
});

export function ActionContextProvider(props: any) {
  const [showMoreSideItems, setShowMoreSideItems] = useState(false);

  function handleMoreSidebarItemsFunction(param: boolean) {
    setShowMoreSideItems(param);
  }

  const context = {
    moreSideItems: showMoreSideItems,
    moreSideItemsFunc: handleMoreSidebarItemsFunction,
  };

  return (
    <ActionContext.Provider value={context}>
      {props.children}
    </ActionContext.Provider>
  );
}

export default ActionContext;

import { createContext, useState } from "react";

const ActionContext = createContext<{
  moreSideItems: boolean;
  moreSideItemsFunc: (param: any) => void;
  isModalOut: boolean;
  setIsModalOut: (param: any) => void;
  moreSubscribers: boolean;
  setMoreSubscribers: (param: any) => void;
}>({
  moreSideItems: true,
  moreSideItemsFunc: (param) => {},
  isModalOut: false,
  setIsModalOut: (param) => {},
  moreSubscribers: false,
  setMoreSubscribers: (param) => {},
});

export function ActionContextProvider(props: any) {
  const [showMoreSideItems, setShowMoreSideItems] = useState(false);
  const [showMoreSubscribers, setShowMoreSubscribers] = useState(false);
  const [showIsModalOut, setShowModalOut] = useState(false);

  function handleMoreSidebarItemsFunction(param: boolean) {
    setShowMoreSideItems(param);
  }

  function handleModalChange(param: boolean) {
    setShowModalOut(param);
  }

  function handleShowMoreSubscribers(param: boolean) {
    setShowMoreSubscribers(param);
  }

  const context = {
    moreSideItems: showMoreSideItems,
    moreSideItemsFunc: handleMoreSidebarItemsFunction,
    isModalOut: showIsModalOut,
    setIsModalOut: handleModalChange,
    moreSubscribers: showMoreSubscribers,
    setMoreSubscribers: handleShowMoreSubscribers,
  };

  return (
    <ActionContext.Provider value={context}>
      {props.children}
    </ActionContext.Provider>
  );
}

export default ActionContext;

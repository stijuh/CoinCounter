import React, {ReactNode, JSX, ReactElement} from "react";

export function generateItemsInHTML(
    amount: number,
    item: JSX.Element | undefined = undefined,
    items: Array<JSX.Element> | undefined = undefined): ReactNode {
    if (item === undefined && items !== undefined)
        return <>
            {(() => {
                return Array.from(
                    {length: items?.length},
                    (_, i) => {
                        return React.cloneElement(items[i], { key: items[i].key + "-" + i })
                    }
                );
            })()}
        </>
    else if (item !== undefined && items === undefined)
        return <>
            {(() => {
            return Array.from(
                {length: amount},
                (_, i) => {
                    return React.cloneElement(item, { key: item.key + "-" + i })
                }
            );
            })()}
        </>
}
import { useRef } from "react";

export const useDragAndDrop = (onDrop) => {
    // Ref to store the item being dragged
    const dragItem = useRef(null);

    // Ref to store the item currently being hovered over  
    // (potential drop target)
    const dragOverItem = useRef(null);

    // called when dragging starts; records the item being dragged
    const handleDragStart = (item) => dragItem.current = item;

    // called when a dragged item enters another item's space;
    // stores the item currently being hovered over
    const handleDragEnter = (item) => dragOverItem.current = item;

    // called when a dragged item is dragged over a valid drop target;
    // required to allow drop (browser prevents drop by default)
    const handleDragOver = (e) => e.preventDefault();

    // Called when dragging ends (drop or cancel)
    const handleDragEnd = () => {
        // Get the current items from the refs
        const from = dragItem.current;     // source item
        const to = dragOverItem.current;   // target item

        // If both refs are set and point to different items,
        // call onDrop with source and target items
        if (from !== null && to !== null && from !== to) {
            onDrop(from, to);
        }

        // Reset for next drag
        dragItem.current = null;
        dragOverItem.current = null;
    };

    // Return the drag event handlers 
    return { 
        handleDragStart, 
        handleDragOver,
        handleDragEnter, 
        handleDragEnd 
    };
};
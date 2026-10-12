import { useRef } from "react";

export const useDialog = () => {
    // ref to access the <dialog> element
    const dialogRef = useRef(null);

    // function to open the dialog
    const openDialog = () => dialogRef.current.showModal();

    // function to close the dialog
    const closeDialog = () => dialogRef.current.close();

    // return object with the ref and functions
    return {
        dialogRef,
        openDialog,
        closeDialog
    };
};
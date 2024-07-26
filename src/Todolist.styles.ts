import {SxProps} from "@mui/material";

export const filterButtonContainerSx: SxProps = {
    display: "flex",
    justifyContent: "space-between",
}

// export const getListItemSx: SxProps = {
//     padding: "0px",
//     justifyContent: "space-between",
//     opacity: props.isDone ? 0.5 : 1,
// }

export const getListItemSx=(isDone:boolean): SxProps =>({
    padding: "0px",
    justifyContent: "space-between",
    opacity: isDone ? 0.5 : 1,
})
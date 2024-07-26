import {styled} from '@mui/material/styles'
import Button from "@mui/material/Button";

type MenuButtonPropsType = {
    background?: string
}
// export const MenuButton = styled(Button)({
//     minWidth: "110px",
//     fontWeight: "bold",
//     borderRadius:"2px",
//     textTransform:"capitalize",
//     color:"#fff",
//     background:"#052b50"
// })

export const MenuButton = styled(Button)<MenuButtonPropsType>(({background}) => ({
    minWidth: "110px",
    fontWeight: "bold",
    borderRadius: "2px",
    textTransform: "capitalize",
    color: "#fff",
    background: background || "#052b50"
}))
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Checkbox from '@mui/material/Checkbox';
import { DropdownStyling } from '../pages/Tasks';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  //edits textbox dropdown styling
  '& .MuiPaper-root': {
    // borderRadius: 6,
    // marginTop: theme.spacing(1),
    // minWidth: 180,
    // color: '#5F5F5F',
    // boxShadow:
    //   'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    // '& .MuiMenu-list': {
    //   padding: '4px 0',
    // },
    // //edits styling for the boxes
    // '& .MuiMenuItem-root': {
    //   '& .MuiSvgIcon-root': {
    //     fontSize: 18,
    //     color: 'theme.palette.text.secondary',
    //     marginRight: theme.spacing(1.5),
    //   },
    //   '&:active': {
    //     backgroundColor: alpha(
    //       theme.palette.primary.main,
    //       theme.palette.action.selectedOpacity,
    //     ),
    //   },
    // },
  },
}));

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        // id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        //styling at the bottom of the Tasks.tsx page
        sx={
          DropdownStyling
        }
      >
        Filter
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disableRipple>
          <BasicCheckbox />
          Completed
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <BasicCheckbox />
          Due in 1 week
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <BasicCheckbox />
          Overdue
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <BasicCheckbox />
          Tag
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

const BasicCheckbox = styled(Checkbox)`
    margin: 0;
    padding: 0;
`
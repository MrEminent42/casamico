import Button from '@mui/material/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Checkbox, Menu, MenuItem, styled } from '@mui/material';
import { useState } from 'react';



interface DropdownOption {
    id: number,
    label: string,
    onClick: () => void
}

const OptionsDropdown = (props: {
    label: string,
    options: DropdownOption[]
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <Button
                variant='contained'
                disableElevation
                color='secondary'
                onClick={handleClick}
            >
                {props.label}
                <ChevronRightIcon />
            </Button>
            <Menu
                open={open}
                onClose={handleClose}
                anchorEl={anchorEl}
            >
                {props.options.map((option) =>
                    <MenuItem>
                        <BasicCheckbox />
                        {option.label}
                    </MenuItem>
                )}
            </Menu>
        </div>
    )
}

export default OptionsDropdown


const BasicCheckbox = styled(Checkbox)`
    padding: 0 10px 0 0;
`
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox, Menu, MenuItem, styled } from '@mui/material';
import { useState } from 'react';



interface DropdownOption {
    id: number,
    label: string,
    onClick: (newState: boolean) => void
}

const SortDropdown = (props: {
    label: string,
    options: DropdownOption[],
    multiple?: boolean,
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [selected, setSelected] = useState<DropdownOption[]>([]);

    const handleMenuButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOptionClick = (option: DropdownOption) => {
        let currentlySelected = selected.some((other) => option.id === other.id);
        let futureSelected = !currentlySelected;

        option.onClick(futureSelected);
        if (props.multiple) {
            // if the option is already selected, remove it from the list of selected options
            setSelected(currentlySelected ? selected.filter((item) => item !== option) : [...selected, option]);
        } else {
            // in the case that this is not a multi-select dropdown, 
            // we only want to allow one option to be selected at a time
            setSelected(currentlySelected ? [] : [option]);
        }
    }



    return (
        <div>
            <Button
                variant='contained'
                disableElevation
                color='secondary'
                onClick={handleMenuButtonClick}
            >
                {props.label}
                <ExpandMoreIcon />
            </Button>
            <Menu
                open={open}
                onClose={handleMenuClose}
                anchorEl={anchorEl}
            >
                {props.options.map((option) =>
                    <MenuItem
                        onClick={() => handleOptionClick(option)}
                        key={option.id}
                    >
                        <BasicCheckbox checked={selected.some((item) => item.id === option.id)} />
                        {option.label}
                    </MenuItem>
                )}
            </Menu>
        </div>
    )
}

export default SortDropdown


const BasicCheckbox = styled(Checkbox)`
    padding: 0 10px 0 0;
`
import AsyncCreateableSelect from 'react-select/async-creatable'
import { MultiValue } from 'react-select'
import { Tag } from '../../Types'

interface TagsDropdownProps {
    onChange: (selected: MultiValue<Tag>) => void;
    loadOptions: (inputValue: string, callback: (options: Tag[]) => void) => void;
}

const TaskTagsDropdown = (props: TagsDropdownProps) => {

    return (
        <AsyncCreateableSelect
            isMulti={true}
            cacheOptions
            defaultOptions
            loadOptions={props.loadOptions}
            noOptionsMessage={() => "Type to create a new tag..."}
            onChange={props.onChange}
            getOptionLabel={(option) => option.tag_name}
            getOptionValue={(option) => option.tag_name}
            getNewOptionData={(inputValue, optionLabel) => ({ tag_name: optionLabel, created_at: '' }) as Tag}
            formatCreateLabel={(inputValue) => `Create tag: "${inputValue}"`}
            filterOption={(option, inputValue) => {
                if (option.data.tag_name.toLowerCase().includes(inputValue.toLowerCase())) {
                    return true;
                }
                return false;
            }}
            styles={{
                control: (baseStyles) => ({
                    ...baseStyles,
                    color: 'gray',
                    backgroundColor: '#eeeeee',
                    border: 'none',
                    margin: '10px 0px',
                }),
                valueContainer: (baseStyles) => ({
                    ...baseStyles,
                    flexWrap: "nowrap",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: 'ellipsis',
                }),
                multiValue: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: '#d1d1d1',
                }),
            }}
        />
    )
}

export default TaskTagsDropdown

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { selectItems } from "../public/data";
import { selectedValueState } from "../atoms/atom";

const SelectBox = styled(Box)`
  z-index: 999;
`;

const SearchControl = () => {
  const [selectedValue, setSelectedValue] = useRecoilState(selectedValueState);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value as string);
  };

  return (
    <SelectBox sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label="Select"
          onChange={handleChange}
        >
          {selectItems.map(item => (
            <MenuItem key={item.key} value={item.key}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </SelectBox>
  );
};

export default SearchControl;

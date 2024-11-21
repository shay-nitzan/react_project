import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export function RobotFilterType({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
    console.log(filterByToEdit)
  }, [filterByToEdit])

  function handleChange(event) {
    const { name, value } = event.target
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [name]: value }))
  }

  return (
    <section className="robot-filter">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            name="type"
            value={filterByToEdit.type}
            onChange={handleChange}
          >
            <MenuItem value="Cooking">Cooking</MenuItem>
            <MenuItem value="Cleaning">Cleaning</MenuItem>
            <MenuItem value="Pleasure">Pleasure</MenuItem>
            <MenuItem value="Office">Office</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </section>
  );
}


// export default function BasicSelect() {
//   const [age, setAge] = React.useState('');

//   const handleChange = (event: SelectChangeEvent) => {
//     setAge(event.target.value as string);
//   };

// export function RobotFilterType({ filterBy, onSetFilterBy }) {

//     const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

//     useEffect(()=>{
//         onSetFilterBy(filterByToEdit)
//     }, [filterByToEdit])

    
//     function handleChange({ target }) {
//         let { name: field, value, type } = target
//         setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
//     }

//     return (
//         <section className="robot-filter">
//         <label htmlFor="type">Choose your type</label>
//         <Box sx={{ minWidth: 120 }}>
//         <FormControl fullWidth>
//             <InputLabel id="type">Type</InputLabel>
//             <Select
//             labelId="type"
//             id="type"
//             value={filterByToEdit.type}
//             label="type"
//             onChange={handleChange}
//             >
//             <MenuItem value={"Cooking"}>Cooking</MenuItem>
//             <MenuItem value={"Cleaning"}>Cleaning</MenuItem>
//             <MenuItem value={"Pleasure"}>Pleasure</MenuItem>
//             <MenuItem value={"Office"}>Office</MenuItem>
//             </Select>
//         </FormControl>
//         </Box>
//     </section>
//     )
// }   



{/* <section className="robot-filter">
<label htmlFor="type">Choose your type</label>
<select onChange={handleChange} value={filterByToEdit.type} id="type" name="type" >
    <option value="">Choose a type</option>
    <option value="Cooking">Cooking</option>
    <option value="Cleaning">Cleaning</option>
    <option value="Pleasure">Pleasure</option>
    <option value="Office">Office</option>
</select>
</section> */}
import { InputAdornment, TextField } from "@mui/material";

export default function TextInput({id, label, onChange, value, type, icon=undefined}){ 
    return (
        <TextField
              autoComplete="off"
              id={id}
              type={type || 'text'}
              variant="filled"
              onChange={onChange}
              value={value}
              label={label}
              className="rounded-lg w-72"
              InputLabelProps={{
                style: {color:'#394867'}
              }}
              inputProps={{
                style: {
                  color: '#394867',
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    {icon}
                  </InputAdornment>
                )
              }}
              sx={{
                background: 'rgb(248, 250, 229, 0.8)',
                '& .MuiFilledInput-underline:after':{
                  borderBottomColor: '#FAEF5D',
                  height: '5rem',
                  borderRadius: '0 0 10px 10px'
                }
              }}
              />
    )
}
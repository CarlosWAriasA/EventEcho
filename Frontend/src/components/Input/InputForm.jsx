import { InputAdornment, TextField } from "@mui/material";

export default function TextInput({
  id,
  label,
  onChange,
  value,
  type,
  icon = undefined,
  style,
  sx,
  multiline = false,
  rows,
  className,
}) {
  return (
    <TextField
      autoComplete="off"
      rows={rows}
      id={id}
      type={type || "text"}
      variant="filled"
      onChange={onChange}
      value={value}
      label={label}
      multiline={multiline}
      className={className}
      InputLabelProps={{
        style: { color: "#394867" },
      }}
      inputProps={{
        style: {
          color: "#394867",
        },
      }}
      InputProps={
        icon && {
          endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
        }
      }
      style={style}
      sx={sx}
    />
  );
}

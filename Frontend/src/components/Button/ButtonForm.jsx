import { Button } from "@mui/material";

export default function ButtonForm({
  label,
  onClick = () => {},
  style = {},
  className,
  variant,
  sx,
}) {
  return (
    <Button
      onClick={onClick}
      type="submit"
      className={className}
      variant={variant}
      style={style}
      sx={sx}
    >
      {label}
    </Button>
  );
}

import { Button } from "@mui/material";

export default function ButtonForm({
  label,
  onClick = () => {},
  style = {},
  className,
  variant,
}) {
  return (
    <Button
      onClick={onClick}
      type="submit"
      className={className}
      variant={variant}
      style={style}
    >
      {label}
    </Button>
  );
}

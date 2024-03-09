import { Button } from "@mui/material";

export default function ButtonForm({ label, onClick = () => {} }) {
  return (
    <Button
      onClick={onClick}
      type="submit"
      className="text-black px-8 font-normal h-10 justify-center py-0 w-full bg-yellow-400 rounded-lg"
      variant="contained"
      sx={{
        backgroundColor: "#FAEF5D",
        color: "#212A3E",
        "&:hover": { backgroundColor: "#FAEF5D" },
      }}
    >
      {label}
    </Button>
  );
}

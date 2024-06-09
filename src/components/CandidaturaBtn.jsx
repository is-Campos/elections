import { Button } from "react-native-paper";

export const CandidaturaBtn = ({ candidatura, isSelected }) => {
  return (
    <Button
      textColor={isSelected ? "white" : "black"}
      mode={isSelected ? "contained" : "outlined"}
      buttonColor={isSelected && "#d51685"}
      style={{ alignSelf: "center", marginVertical: 5, borderColor: !isSelected && "#d51685" }}
    >
      {candidatura.cargoPolitico}
    </Button>
  );
};

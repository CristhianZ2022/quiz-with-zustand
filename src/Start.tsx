import { Button, TextField } from "@mui/material";
import { useQuestionsStore } from "./store/questions";
import { useState } from "react";

export const Start = () => {
  const [limitQuestions, setLimitQuestions] = useState('1');
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);
  

  const handleClick = () => {
    fetchQuestions(Number(limitQuestions));
  };
  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Start
      </Button>
      <TextField
        type="number"
        slotProps={{
          htmlInput: { min: 1 },
        }}
        sx={{ width: "275px", marginLeft: "10px"}}
        onChange={(e) => setLimitQuestions(e.target.value)}
        placeholder="Ingresa el número de preguntas"
      />
    </>
  );
};

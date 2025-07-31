import { Button } from "@mui/material";
import { useQuestionsData } from "./hooks/useQuestionsData";
import { useQuestionsStore } from "./store/questions";

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData();
  const reset = useQuestionsStore((state) => state.reset);

  return (
    <>
      <footer style={{ marginTop: "25px" }}>
        <strong>{`${correct} correct - ${incorrect} incorrect - ${unanswered} unanswered`}</strong>
      </footer>
      <Button onClick={() => reset()}>Reset Game</Button>
    </>
  );
};

import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useQuestionsStore } from "./store/questions";
import { type Question as QuestionType } from "./types.d";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Footer } from "./Footer";

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const handleClick = (anwserIndex: number) => () => {
    selectAnswer(info.id, anwserIndex);
  };

  const getBackgroundColor = (index: number) => {
    const { correctAnswer, userSelectedAnswer } = info;
    // Si el usuario no ha seleccionado una respuesta, devolvemos transparent
    if (userSelectedAnswer === undefined) return "transparent";
    // Si el usuario selecciono, pero la respuesta es incorrecta, devolvemos transparent
    if (index !== correctAnswer && index !== userSelectedAnswer)
      return "transparent";
    // Si el usuario selecciono la respuesta correcta, devolvemos color verde
    if (index === correctAnswer) return "#00ff00";
    // Si el usuario selecciono la respuesta incorrecta, devolvemos color rojo
    if (index === userSelectedAnswer) return "#ff0000";

    return "transparent";
  };

  return (
    <Card variant="outlined" sx={{ textAlign: "left" }}>
      <Typography variant="h5" sx={{ padding: 2 }}>
        {info.question}
      </Typography>
      <SyntaxHighlighter
        language="javascript"
        style={gradientDark}
        customStyle={{
          margin: 0,
          padding: 15,
          backgroundColor: "transparent",
          borderRadius: 0,
        }}
      >
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} sx={{ bgcolor: "#333" }} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer !== undefined}
              onClick={handleClick(index)}
              sx={{ backgroundColor: getBackgroundColor(index) }}
            >
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const goToNextQuestion = useQuestionsStore((state) => state.goToNextQuestion);
  const goToPrevQuestion = useQuestionsStore((state) => state.goToPrevQuestion);

  const questionInfo = questions[currentQuestion];
  return (
    <>
      <Stack direction="row" gap={2} alignItems="center" justifyContent="center">
        <IconButton onClick={goToPrevQuestion} disabled={currentQuestion === 0}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </IconButton>

        {currentQuestion + 1} / {questions.length}

        <IconButton onClick={goToNextQuestion} disabled={currentQuestion === questions.length - 1}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  );
};

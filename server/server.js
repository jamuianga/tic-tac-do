import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/todos", (request, response) => {
  const todos = [
    {
      id: 1,
      short_description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      due_date: null,
      priority: null,
    },
    {
      id: 2,
      short_description:
        "Saepe quia consequatur adipisci quis commodi tenetur accusamus quae rem debitis consectetur minima omnis odio laboriosam, sequi ad! Voluptatibus, ipsa.",
      due_date: null,
      priority: null,
    },
    {
      id: 3,
      short_description:
        "Earum inventore at, error quos non aliquam magni quibusdam esse ipsum deleniti!",
      due_date: null,
      priority: null,
    },
  ];
  return response.json(todos);
});

app.listen(3000, () => {
  console.log(`Local: http://localhost:3000`);
});

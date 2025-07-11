import { Typography } from "@mui/material";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Welcome to BudgetIQ
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Your intelligent personal finance companion
      </Typography>
    </Layout>
  );
}

export default App;
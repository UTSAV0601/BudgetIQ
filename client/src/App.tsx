import { Route, Switch } from "wouter";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route>
          <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold text-gray-800">404 - Page Not Found</h1>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to BudgetIQ</h1>
        <p className="text-gray-600">Your personal finance management solution</p>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      <p className="text-gray-600 mt-2">Your financial overview</p>
    </div>
  );
}

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign In</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
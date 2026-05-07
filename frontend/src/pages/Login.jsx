import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button.jsx";
import Input from "../components/Input.jsx";
import Card from "../components/Card.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { loginAdmin } from "../api/auth.js";
import { setToken } from "../utils/auth.js";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginAdmin({ username, password });
      setToken(data.token);
      const destination = location.state?.from || "/admin";
      navigate(destination);
    } catch (err) {
      setError("Invalid login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <Card className="space-y-4">
        <div className="space-y-2">
          <h1 className="font-display text-2xl text-deep">Admin Login</h1>
          <p className="text-sm text-slate-600">
            Sign in to manage surveys and view analytics.
          </p>
        </div>
        <ErrorMessage message={error} />
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="admin"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;

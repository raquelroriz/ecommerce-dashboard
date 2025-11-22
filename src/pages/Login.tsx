import LoginForm from "../components/LoginForm";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export default function LoginPage() {
  const {login} = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || "/";
  return (
    <div className="mx-auto max-w-sm px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Login</h1>
      <div className="rounded-md border border-brand-200 bg-white p-6">
        <LoginForm onSubmit={async ({email, password}) => {
          await login(email, password);
          navigate(from, {replace: true});
        }}/>
        <p className="mt-4 text-sm text-neutral-700">
          Don't have an account? {" "}
          <Link to="/register" className="font-medium text-brand-700 hover:text-brand-800">Create one</Link>
        </p>
      </div>
    </div>
  );
}
import RegisterForm from "../components/RegisterForm";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const from = location.state?.from?.pathname || "/";
  return (
    <div className="mx-auto max-w-sm px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Create new account</h1>
      <div className="rounded-md border border-brand-200 bg-white p-6">
        <RegisterForm onSubmit={async ({ name, email, password }) => {
          await register(name, email, password);
          navigate(from, { replace: true });
        }} />
        <p className="mt-4 text-sm text-neutral-700">
          Already have an account? {" "}
          <Link to="/login" state={{ from: { pathname: from } }} className="font-medium text-brand-700 hover:text-brand-800">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

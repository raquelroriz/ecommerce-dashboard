import LoginForm from "../components/LoginForm";
import {Link} from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Login</h1>
      <div className="rounded-md border border-brand-200 bg-white p-6">
        <LoginForm onSubmit={async ({ email, password }) => {
          // TODO: integrar com serviço de autenticação
          console.log("login", email, password);
        }} />
        <p className="mt-4 text-sm text-neutral-700">
          Não tem conta? {" "}
          <Link to="/register" className="font-medium text-brand-700 hover:text-brand-800">Crie uma</Link>
        </p>
      </div>
    </div>
  );
}
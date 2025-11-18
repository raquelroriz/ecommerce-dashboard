import RegisterForm from "../components/RegisterForm";
import {Link} from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Criar nova conta</h1>
      <div className="rounded-md border border-brand-200 bg-white p-6">
        <RegisterForm onSubmit={async ({ name, email, password }) => {
          // TODO: integrar com serviço de criação de conta
          console.log("register", { name, email, password });
        }} />
        <p className="mt-4 text-sm text-neutral-700">
          Já tem conta? {" "}
          <Link to="/login" className="font-medium text-brand-700 hover:text-brand-800">Faça login</Link>
        </p>
      </div>
    </div>
  );
}

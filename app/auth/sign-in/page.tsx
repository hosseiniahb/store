import { AuthForm } from "@/components/auth/AuthForm";

export default function SignInPage() {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900 p-10">
      <div className="w-full h-full md:w-3/5 lg:w-2/5 rounded-lg overflow-hidden flex items-center justify-between">
        <AuthForm />
      </div>
    </section>
  );
}

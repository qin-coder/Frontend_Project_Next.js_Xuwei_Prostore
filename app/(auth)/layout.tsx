import SignInPage from './sign-in/page';

export default function AuthLayout() {
  return (
    <div className="flex h-screen flex-col">
      <main className="flex-1 wrapper">
        <SignInPage />
      </main>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth, googleProvider } from "../firebase";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [working, setWorking] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/");
      }
    });

    return unsubscribe;
  }, [router]);

  async function handleLogin(e) {
    e.preventDefault();
    setWorking(true);
    setMessage("");

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      router.replace("/");
    } catch (error) {
      console.error(error);
      setMessage("Login failed. Check your email and password.");
    } finally {
      setWorking(false);
    }
  }

  async function handleGoogleLogin() {
    setWorking(true);
    setMessage("");

    try {
      await signInWithPopup(auth, googleProvider);
      router.replace("/");
    } catch (error) {
      console.error(error);
      setMessage("Google sign-in failed.");
    } finally {
      setWorking(false);
    }
  }

  async function handleReset() {
    if (!email.trim()) {
      setMessage("Enter your email address first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage("Password reset email sent.");
    } catch (error) {
      console.error(error);
      setMessage("Could not send the password reset email.");
    }
  }

  return (
    <main className="loginPage">
      <section className="loginCard">
        <div className="eyebrow">CHRONIC WORM GENETICS</div>

        <h1>Chronic Seed Vault V2</h1>

        <p className="loginIntro">
          Sign in with your existing Seed Vault account.
        </p>

        <form onSubmit={handleLogin} className="loginForm">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </label>

          <button type="submit" disabled={working}>
            {working ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <button
          type="button"
          className="googleButton"
          onClick={handleGoogleLogin}
          disabled={working}
        >
          Continue with Google
        </button>

        <button
          type="button"
          className="resetButton"
          onClick={handleReset}
        >
          Forgot password?
        </button>

        {message && <div className="loginMessage">{message}</div>}

        <div className="migrationNote">
          <strong>Already used Seed Vault Classic?</strong>
          <br />
          Use the same account here. Your Classic vault will be connected to
          your V2 account during migration.
        </div>
      </section>
    </main>
  );
}

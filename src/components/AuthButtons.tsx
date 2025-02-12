import { useAuth } from "@/context/AuthContext";

const AuthButtons = () => {
  const { user, loginWithGoogle, logout } = useAuth();

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <button onClick={logout}>Sign Out</button>
        </div>
      ) : (
        <button onClick={loginWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default AuthButtons;

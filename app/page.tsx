import AuthForm from './components/AuthForm';

const Home: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        background:
          'linear-gradient(167.96deg, rgba(244, 249, 255, 1), rgba(224, 237, 251, 1))',
        width: '100vw',
        height: '100vh',
      }}
    >
      <AuthForm />
    </div>
  );
};

export default Home;

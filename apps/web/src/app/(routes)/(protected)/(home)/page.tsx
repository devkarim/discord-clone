import Container from '@/components/ui/container';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <Container className="space-y-3">
      <h1 className="text-2xl font-semibold">Home page</h1>
      <p>
        Messaging your friends and family can not be easier! Choose a contact to
        start messaging.
      </p>
    </Container>
  );
};

export default HomePage;

import DMSidebar from '@/components/sidebar/dm-sidebar';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = ({}) => {
  return (
    <div className="h-full">
      <DMSidebar />
    </div>
  );
};

export default HomePage;

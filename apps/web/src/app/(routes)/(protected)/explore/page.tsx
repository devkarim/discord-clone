'use client';

import Container from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';
import usePublicServers from '@/hooks/use-public-servers';
import ServerCardsList from '@/components/server/server-cards-list';

interface ExplorePageProps {}

const ExplorePage: React.FC<ExplorePageProps> = ({}) => {
  const { data: publicServers, isLoading } = usePublicServers();

  if (isLoading)
    return (
      <Container className="flex flex-wrap gap-6">
        <Skeleton className="w-full md:w-72 h-72" />
        <Skeleton className="w-full md:w-72 h-72" />
        <Skeleton className="w-full md:w-72 h-72" />
        <Skeleton className="w-full md:w-72 h-72" />
        <Skeleton className="w-full md:w-72 h-72" />
        <Skeleton className="w-full md:w-72 h-72" />
        <Skeleton className="w-full md:w-72 h-72" />
        <Skeleton className="w-full md:w-72 h-72" />
        <Skeleton className="w-full md:w-72 h-72" />
        <Skeleton className="w-full md:w-72 h-72" />
      </Container>
    );

  if (!publicServers) return null;

  return (
    <Container className="overflow-auto scrollbar-thin scrollbar-track-channels scrollbar-thumb-black/30 scrollbar-thumb-rounded-full">
      <ServerCardsList title="Featured servers" servers={publicServers} />
    </Container>
  );
};

export default ExplorePage;

'use client';

import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

import { Logger } from 'utils';
import { Exception } from 'models';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateServer } from '@/services/server';
import useClientServers from '@/hooks/use-servers';
import ImageUpload from '@/components/ui/image-upload';
import useCurrentServer from '@/hooks/use-current-server';
import SaveChangesToast from '@/components/settings/save-changes-toast';
import CheckboxCard from '@/components/ui/checkbox-card';

interface ServerOverviewProps {}

const ServerOverview: React.FC<ServerOverviewProps> = ({}) => {
  const { data: server, refetch } = useCurrentServer();
  const { refetch: refetchServers } = useClientServers();
  const [name, setName] = useState<string>();
  const [isPublic, setIsPublic] = useState<boolean>();
  const [loading, setLoading] = useState(false);
  const [saveChangesOpen, setSaveChangesOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    updateSaveChanges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, isPublic]);

  if (!server) return null;

  const saveChanges = async () => {
    try {
      setLoading(true);
      await updateServer(server.id, { name, imageUrl, isPublic });
      setSaveChangesOpen(false);
      refetch();
      refetchServers();
      toast.success('Server updated successfully');
    } catch (err) {
      Logger.exception(err, 'register-form');
      toast.error(Exception.parseError(err));
    } finally {
      setLoading(false);
    }
  };

  const onNameChange = (value: string) => {
    setName(value);
  };

  const onReset = () => {
    setImageUrl(undefined);
    setName(undefined);
    setIsPublic(undefined);
    updateSaveChanges();
    setLoading(false);
  };

  const updateSaveChanges = () => {
    if (imageUrl && imageUrl != server.imageUrl)
      return setSaveChangesOpen(true);
    if (name && name != server.name) return setSaveChangesOpen(true);
    if (isPublic != undefined && isPublic !== server.isPublic)
      return setSaveChangesOpen(true);
    setSaveChangesOpen(false);
  };

  return (
    <div className="py-6">
      <SaveChangesToast
        isOpen={saveChangesOpen}
        onSaveChanges={saveChanges}
        onReset={onReset}
        loading={loading}
      />
      <div className="space-y-12">
        <div className="flex gap-12">
          <ImageUpload
            imageUrl={imageUrl ?? server.imageUrl}
            name={name ?? server.name}
            onUploadComplete={(url) => {
              setImageUrl(url);
              setSaveChangesOpen(true);
            }}
          />
          <div className="w-72 space-y-1">
            <Label>SERVER NAME</Label>
            <Input
              value={name ?? server.name}
              onChange={(e) => onNameChange(e.currentTarget.value)}
            />
          </div>
        </div>
        <CheckboxCard
          checked={isPublic ?? server.isPublic}
          onCheckedChange={(checked) => setIsPublic(checked)}
          title="Public"
          description="By enabling this option, this server will be public to everyone in 'Explore Servers' page."
        />
      </div>
    </div>
  );
};

export default ServerOverview;

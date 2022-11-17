import { $host } from '../../api/interceptors';

export const FileService = {
  async upload(file: FormData, folder?: string) {
    return $host.post<{ url: string; name: string }[]>(`/file`, file, {
      params: { folder },
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};

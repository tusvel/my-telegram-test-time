import { Dayjs } from 'dayjs';

export interface IPostCreateRequest {
  channel_id: number;
  text: string;
  button_enabled: boolean;
  button_text: string;
  button_url: string;
  is_preview: boolean;
  schedule_date?: Date | string | Dayjs;
  is_publisched: boolean;
  media_id: number[];
}

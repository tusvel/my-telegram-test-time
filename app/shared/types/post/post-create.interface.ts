export interface IPostCreateRequest {
  channel_id: number;
  text: string;
  has_button: boolean;
  text_button: string;
  button_url: string;
  is_preview: boolean;
  schedule_date: Date | string;
  is_publisched: boolean;
  media_id: string[];
}

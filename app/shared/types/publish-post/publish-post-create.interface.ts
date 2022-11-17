export interface IPublishPostCreate {
  channel_id: number;
  text: string;
  has_button: boolean;
  text_button: string;
  button_url: string;
  is_preview: boolean;
  schedule_date: Date | string;
  media_id: number;
}

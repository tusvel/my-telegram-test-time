import { SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';

import { IPostInput } from '@/pages/home/CreatePost/create-post.interface';

import { save } from '@/components/ui/TextEditor/plugins/SaveAsHtmlPlugin';

import { PostService } from '@/services/post.service';

export const useCreatePost = () => {
  const { mutateAsync } = useMutation('Create post', (data: IPostInput) =>
    PostService.create(data)
  );

  const deleteWater = (html: any) => {
    const parser = new DOMParser();
    const document = parser.parseFromString(html, 'text/html');

    document.querySelectorAll('p.editor-paragraph').forEach((el) => {
      el.outerHTML = el.innerHTML;
    });
    document.querySelectorAll('strong').forEach((el) => {
      el.outerHTML = `<b>${el.innerHTML}</b>`;
    });
    document.querySelectorAll('em.editor-text-italic').forEach((el) => {
      el.outerHTML = `<i>${el.innerHTML}</i>`;
    });
    document.querySelectorAll('span.editor-text-underline').forEach((el) => {
      el.outerHTML = `<u>${el.innerHTML}</u>`;
    });
    document
      .querySelectorAll('span.editor-text-strikethrough')
      .forEach((el) => {
        el.outerHTML = `<s>${el.innerHTML}</s>`;
      });
    document.querySelectorAll('a.editor-link').forEach((el) => {
      el.querySelectorAll('span').forEach((span) => {
        span.outerHTML = span.innerHTML;
      });
      const link = el.getAttribute('href');
      el.outerHTML = `<a href=${link}>${el.innerHTML}</a>`;
    });
    document.querySelectorAll('span[style="color: gray;"]').forEach((el) => {
      el.outerHTML = `<tg-spoiler>${el.innerHTML}</tg-spoiler>`;
    });

    console.log(document);
  };

  const onSubmit: SubmitHandler<IPostInput> = async (data) => {
    data.media_style = data.media_style !== 'false';
    data.schedule_date = `${data.schedule_date} ${data.schedule_time}`;
    let html = save();
    deleteWater(html);
    await mutateAsync(data);
  };

  return { onSubmit };
};

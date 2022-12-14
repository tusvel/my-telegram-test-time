import { IPostTextResponse } from '@/shared/types/post-text/post-text-response.interface';

export const telegramConverter = (
  code: string | undefined,
  items: IPostTextResponse[] | null,
  typeCode: string
) => {
  const parser = new DOMParser();

  if (typeCode === 'html' && code) {
    const document = parser.parseFromString(code, 'text/html');
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
    document.querySelectorAll('span[style]').forEach((el) => {
      el.outerHTML = `<tg-spoiler>${el.innerHTML}</tg-spoiler>`;
    });
    document.querySelectorAll('span').forEach((el) => {
      el.outerHTML = el.innerHTML;
    });
    document.querySelectorAll('a.editor-link').forEach((el) => {
      el.querySelectorAll('span').forEach((span) => {
        span.outerHTML = span.innerHTML;
      });
      const link = el.getAttribute('href');
      if (link && link.split('')[0] === '@') {
        el.outerHTML = `<a href=https://t.me/${link.slice(1)}>${
          el.innerHTML
        }</a>`;
      } else {
        el.outerHTML = `<a href=${link}>${el.innerHTML}</a>`;
      }
    });
    return document.body.innerHTML || '';
  } else {
    items &&
      items.map((item) => {
        const document = parser.parseFromString(item.text, 'text/html');
        document.querySelectorAll('b').forEach((el) => {
          el.outerHTML = `<strong>${el.innerHTML}</strong>`;
        });
        document.querySelectorAll('i').forEach((el) => {
          el.outerHTML = `<em.editor-text-italic>${el.innerHTML}</em.editor-text-italic>`;
        });
        document.querySelectorAll('u').forEach((el) => {
          el.outerHTML = `<span.editor-text-underline>${el.innerHTML}</span.editor-text-underline>`;
        });
        document.querySelectorAll('s').forEach((el) => {
          el.outerHTML = `<span.editor-text-strikethrough>${el.innerHTML}</span.editor-text-strikethrough>`;
        });
        document.querySelectorAll('span').forEach((el) => {
          el.querySelectorAll('a.editor-link').forEach((span) => {
            span.outerHTML = span.innerHTML;
          });
          const link = el.getAttribute('href');
          el.outerHTML = `<a href=${link} class="editor-link">${el.innerHTML}</a>`;
        });
        document
          .querySelectorAll('span[style="color: black;"]')
          .forEach((el) => {
            el.outerHTML = `<tg-spoiler style="color:black; opacity:0.5">${el.innerHTML}</tg-spoiler>`;
          });
        return document;
      });
    return items;
  }
};

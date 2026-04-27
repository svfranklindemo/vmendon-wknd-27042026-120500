import { decorateBlock } from '../../blocks/video/video.js';


export default function decorate(block) {

  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  if (block.classList.contains('video-column')) {
    // setup image columns
    [...block.children].forEach((row) => {
      row.classList.add("card-block");
      [...row.children].forEach((col) => {
        const pic = col.querySelector('picture');
        if (pic) {
          const picWrapper = pic.closest('div');
          picWrapper.classList.add('video');
          decorateBlock(picWrapper)

        }
      });
    });
  } else {
    // setup image columns
    [...block.children].forEach((row) => {
      row.classList.add("card-block");
      [...row.children].forEach((col) => {
        const pic = col.querySelector('picture');
        if (pic) {
          const picWrapper = pic.closest('div');
          if (picWrapper && picWrapper.children.length === 1) {
            // picture is only content in column
            picWrapper.classList.add('columns-img-col');
          }

        }
      });

      if (block.classList.contains('embed-block')) {
        const table = row.querySelector('table');
        table.classList.add('embed-table')
        if (table) {
          const anchor = table.querySelector('a');
          table.insertAdjacentHTML('afterend', getDefaultEmbed(anchor));
        }
      }
    });
  }

}

const getDefaultEmbed = (url) => `<div class="default-embed" style="left: 0; width: 100%; height: 600px; position: relative;">
    <iframe src="${url.href}" style="border: 0; top: 0; left: 0; width: 100%; height: 100%; position: absolute;" allowfullscreen=""
      scrolling="no" allow="encrypted-media" title="Content from ${url.hostname}" loading="lazy">
    </iframe>
  </div>`;

